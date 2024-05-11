import { Control } from 'react-hook-form'
import { IAuth } from '../../../shared/types/auth.interface'
import { FC } from 'react'
import { validEmail } from '../../../regex'
import { Field } from '../../ui'

interface IAuthFields {
	control: Control<IAuth>
	isPassRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<>
			<Field<IAuth>
				control={control}
				name='email'
				placeholder='Enter email'
				rules={{
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address'
					}
				}}
				keyboardType='email-address'
			/>

			<Field<IAuth>
				control={control}
				name='password'
				placeholder='Enter password'
				secureTextEntry
				rules={
					isPassRequired
						? {
								required: 'Password is required!',
								minLength: {
									value: 6,
									message: 'Password should be minimun 6 characteers long'
								}
							}
						: {}
				}
			/>
		</>
	)
}

export default AuthFields
