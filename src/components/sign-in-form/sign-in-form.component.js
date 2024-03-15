import Reat, { useState, useContext } from 'react'
import FormInput from '../form-input/form-input.component';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.style.scss';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context'

// We can track each input using their states
// we can also use an object as long as we know all input have the same inputs.

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // Using the context
    const {setCurrentUser } = useContext(UserContext);

    // Ressetting form fields after submission
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Then attempt to create the user with try & catch as we can fail to call to extrenal firebase server
        
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
                     
            resetFormFields();
            
        } catch (error) {

            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');

                    break
                
                case ' auth/user-not-found ':
                    alert(' No user associatted with email');

                    break
                
                default:
                    console.log(error);
            }          
            console.log(error);           
        }        
    }

    // To be able to handle changes , we need to create a function to do so
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2> Already have an account? </h2>
            <span> Sign in with email and password </span>
            <form onSubmit={ handleSubmit }>              
             
                <FormInput
                    label = "Email"
                    type='email' required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                     label = "Password"
                    type='password' required
                    //placeholder='Enter your password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type = 'button' buttonType='google' onClick= {SignInWithGoogle}>Google Sign in</Button>                   
                </div>           
            </form>
        </div>
    )
}

export default SignInForm;