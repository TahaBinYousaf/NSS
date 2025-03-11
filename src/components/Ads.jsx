import React from 'react';
import { ImGithub } from 'react-icons/im';

const Ads = ({ img }) => {
	return (
		<div className='flex justify-center items-center h-full w-full'>
			<img
				src={img}
				alt='Ad'
				className='w-full py-10 px-10 cursor-pointer'
			/>
		</div>
	);
};

export default Ads;
