import { Fragment } from 'react';
import { type AlertModalProps } from '../interfaces';

export const AlertModal = ({
	title,
	message,
	onDismiss,
}: AlertModalProps): JSX.Element => {
	return (
		<Fragment>
			<div className='fixed z-10 inset-0 bg-black opacity-50 dark:bg-gray-900'></div>
			<div className='md:animate-[bounce_8s_ease-in-out_infinite]  fixed z-20 inset-0 overflow-y-auto container mx-auto px-20'>
				<div className='flex items-center justify-center min-h-screen'>
					<div className='bg-[#202020] opacity-80 dark:bg-gray-800 rounded-2xl border-2 w-full'>
						<div className='px-6 py-4'>
							{/* Modal title */}
							<div className='text-8xl font-mono italic font-bold text-white'>
								{title}
							</div>
							<div className='mt-3 text-white text-5xl font-mono font-bold'>
								{message}
							</div>
						</div>
						<div className='w-xl flex justify-end px-6 py-4'>
							<button
								onClick={onDismiss}
								className='w-1/4 px-4 py-2 border-4 text-2xl font-bold bg-black text-white rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white'
							>
								Start Game
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};
