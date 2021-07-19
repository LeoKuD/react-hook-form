import Typography from '@material-ui/core/Typography'
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from 'react'
import { Form } from './components/Form'
import { MainContainer } from './components/MainContainer'
import { Input } from './components/Input'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { PrimaryButton } from './components/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { useData } from './DataContext';

const schema = yup.object().shape({
    email: yup.string().email('Email should have correct format').required('Email is a required field')
})

const normolizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
        return value
    }
    return phoneNumber.formatInternational()
}

export const Step2 = () => {
    const { data, setValues } = useData()
    const hystory = useHistory()
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: { email: data.email, hasPhone: data.hasPhone },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        hystory.push('/step3')
        setValues(data)
    }
    const hasPhone = watch("hasPhone")

    return <MainContainer>
        <Typography component='h2' variant='h5'>🦄 Step 2</Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("email")}
                id='email'
                type='email'
                label='Email'
                name='email'
                required
                error={!!errors.email}
                helperText={errors?.email?.message}>
            </Input>
            <label htmlFor="hasPhone">Do you have a phone</label>
            <input type='checkbox' {...register('hasPhone')} id='hasPhone' name='hasPhone' color='primary' />

            {hasPhone && (
                <Input
                    {...register("phoneNumber")}
                    id="phoneNumber"
                    type="tel"
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={(event) => {
                        event.target.value = normolizePhoneNumber(event.target.value)
                    }}
                />
            )}

            <PrimaryButton>Next</PrimaryButton>
        </Form>
    </MainContainer >
}