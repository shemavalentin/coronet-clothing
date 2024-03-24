import Reat, { useState } from 'react'
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import './sign-up-form.style.js';
import Button from '../button/button.component';
import { SignUpContainer } from './sign-up-form.style.js';

// We can track each input using their states
// we can also use an object as long as we know all input have the same inputs.

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    // Ressetting form fields after submission
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords missmatch!!");
            return;
        }
        // Then attempt to create the user with try & catch as we can fail to call to extrenal firebase server
        
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Can not create user, email already in use');
            } else {
                
                console.log('User creation encountered an error', error);         
            }
        }        
    }

    // To be able to handle changes , we need to create a function to do so
    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignUpContainer>
            <h2> Don't have an account? </h2>
            <span> Sign up with email and password </span>
            <form onSubmit={ handleSubmit }>              
                <FormInput
                    label = "DisplayName "
                    type='text' required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />
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
                <FormInput
                    label = "Confirm Password"
                    type='password' required
                    //placeholder='Confirm password'
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />               
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;