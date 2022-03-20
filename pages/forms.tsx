import { FieldErrors, useForm } from 'react-hook-form';

// Better validation
// Better Erros (set, clear, display)
// Have control over inputs

interface LoginForm {
    username: string;
    password: string;
    email: string;
    errors?: string;
}

export default function Forms() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        reset,
        resetField,
    } = useForm<LoginForm>({ mode: 'onBlur' });
    const onValid = (data: LoginForm) => {
        // console.log('im valid bby');
        reset();
        setError('username', { message: 'backend err' });
    };
    const onInvalid = (errors: FieldErrors) => {
        console.log(errors);
    };
    setValue('username', 'help');
    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <input
                {...register('username', {
                    required: 'Username is required',
                    minLength: {
                        message: 'The username should be longer than 5 chars.',
                        value: 5,
                    },
                })}
                type='text'
                placeholder='Username'
            />
            <input
                {...register('email', {
                    required: 'Email is required',
                    validate: {
                        notGmail: (value) =>
                            !value.includes('@gmail.com') || 'Gmail 입니다',
                    },
                })}
                type='email'
                placeholder='Email'
                className={`${Boolean(
                    errors.email?.message ? 'border-red-500' : 'border-blue-500'
                )}`}
            />

            {errors.email?.message}
            <input
                {...register('password', { required: 'Password is required' })}
                type='password'
                placeholder='Password'
            />
            <input type='submit' value='Create Account' />
        </form>
    );
}
