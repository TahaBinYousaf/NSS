import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export const LatestCollection2Item = ({
	id,
	image,
	name,
	price,
	desc,
	address,
	date,
	condition,
}) => {
	const { currency } = useContext(ShopContext);

	return (
		<div className='border rounded-lg border-gray-300'>
			{' '}
			<Link
				className='text-gray-700 cursor-pointer '
				to={`/product2/${id}`}>
				<div className='overflow-hidden rounded-lg w-full'>
					<img
						src={image}
						className='w-full h-[350px] sm:h-[350px] md:h-[350px] hover:scale-110 transition ease-in-out object-cover'
						alt=''
					/>
				</div>
				<div className='px-6 py-3'>
					<p className='pt-3 pb-1 text-xl'>{name}</p>
					<p className=' font-medium  text-lg'>
						<span className=''>{address}</span>
					</p>
					<div className='flex justify-between items-center'>
						<p className='  font-bold  text-lg '>
							<span className=''>{condition}</span>
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};
