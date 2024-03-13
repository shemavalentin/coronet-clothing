import Reat, { useState} from 'react'

// We can track each input using their states
// we can also use an object as long as we know all input have the same inputs.

const defaultFormFields = {
    enterNames: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { enterNames, email, password, confirmPassword } = formFields;

    console.log(formFields);

    // To be able to handle changes , we need to create a function to do so

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div>
            <h1> Sign up with email and password </h1>
            <form onSubmit={ () =>{}}>
                <label>Enter Names</label>
                <input
                    type='text' required
                    onChange={handleChange}
                    name='enterNames'
                    value={enterNames}
                />

                <label> Email </label>
                <input
                    type='email' required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <label>Password</label>
                <input type='password' required
                    placeholder='Enter your password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <label>Confirm Password</label>
                <input
                    type='password' required
                    placeholder='Comfirm password'
                    onChange={handleChange}
                    name='comfirmPassword'
                    value={confirmPassword}
                />
                
                <button type='submit'>Sign Up</button>

            </form>
        </div>
    )
}

export default SignUpForm;