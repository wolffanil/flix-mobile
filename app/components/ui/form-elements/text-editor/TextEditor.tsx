import { FC, useRef } from 'react'
import { View, Text } from 'react-native'
import { ITextEditor } from './text-editor.interface'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import cn from 'clsx'

const TextEditor: FC<ITextEditor> = ({
	onChange,
	value,
	error,
	placeholder = 'Write your cool content here :)'
}) => {
	const richEditor = useRef<RichEditor>(null)

	return (
		<View>
			<View
				className={cn(
					'my-4 border flex-col-reverse w-full border-solid border-transparent rounded-xl overflow-hidden',
					{
						'border-red': !!error
					}
				)}
			>
				<RichEditor
					ref={richEditor}
					onChange={onChange}
					placeholder={placeholder}
					initialHeight={200}
					editorStyle={{
						backgroundColor: 'rgba(34,34,34, .5)',
						color: 'white'
					}}
					initialContentHTML={value}
				/>

				<RichToolbar
					editor={richEditor}
					actions={[
						actions.setBold,
						actions.setItalic,
						actions.insertLink,
						actions.undo,
						actions.keyboard
					]}
					style={{
						backgroundColor: '#222'
					}}
					iconTint='white'
					selectedIconTint='#1DA64F'
				/>
			</View>

			{error && <Text className='text-red'>{error.message}</Text>}
		</View>
	)
}

export default TextEditor
