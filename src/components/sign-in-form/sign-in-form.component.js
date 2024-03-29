import Reat, { useState } from 'react'
import FormInput from '../form-input/form-input.component';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { SignInContainer, ButtonsContainer } from './sign-in-form.style';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

// We can track each input using their states
// we can also use an object as long as we know all input have the same inputs.

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // Ressetting form fields after submission
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Then attempt to create the user with try & catch as we can fail to call to extrenal firebase server
        
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
                                 
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
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button  buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick= {SignInWithGoogle}>Google Sign in</Button>                   
                </ButtonsContainer>           
            </form>
        </SignInContainer>
    )
}

export default SignInForm;