import { FC } from 'react'
import cn from 'clsx'
import { Text } from 'react-native'
import { IHeading } from './heading.interface'

const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<Text
			className={cn(
				'text-white text-opacity-80 font-semibold text-3xl',
				className
			)}
			numberOfLines={1}
		>
			{title}
		</Text>
	)
}

export default Heading
