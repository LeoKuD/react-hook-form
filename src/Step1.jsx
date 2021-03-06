import React from 'react'
import { MainContainer } from './components/MainContainer'
import Typography from '@material-ui/core/Typography'
import { useForm } from "react-hook-form"
import { Form } from './components/Form'
import { Input } from './components/Input'
import { PrimaryButton } from './components/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom'
import { useData } from './DataContext'

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "First name should not contain numbers")
        .required("First name is a required field"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
        .required("Last name is a required field"),
})

export const Step1 = () => {
    const history = useHistory()
    const { data, setValues } = useData()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        history.push('/step2')
        setValues(data)
    }

    return <MainContainer>
        <Typography component='h2' variant='h5'>🦄 Step 1</Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register("firstName")}
                label="First Name"
                type="text"
                name="firstName"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
            />

            <Input
                {...register("lastName")}
                label="Last Name"
                type="text"
                name="lastName"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
            />
            <PrimaryButton>Next</PrimaryButton>
        </Form>
    </MainContainer>
}