import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export const LatestCollection6Items = ({
	id,
	image,
	name,
	price,
	desc,
	address,
	date,
}) => {
	const { currency } = useContext(ShopContext);

	return (
		<div className='border rounded-lg border-gray-300'>
			{' '}
			<Link
				className='text-gray-700 cursor-pointer '
				to={`/product6/${id}`}>
				<div className='px-6 py-3'>
					
					<p className='pt-3 pb-1 font-bold text-xl'>{desc}</p>
					<p className=' font-medium  text-lg'>
						<span className=''>{address}</span>
					</p>
					<p className=' font-medium  text-lg '>
						<span className=''>{date}</span>
					</p>
					<p className=' font-bold   text-xl'>
						{currency} <span className=''>{price}</span>
					</p>
				</div>
			</Link>
		</div>
	);
};
