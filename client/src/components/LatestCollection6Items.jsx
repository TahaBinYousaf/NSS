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
		<div className='border rounded-lg border-gray-300 overflow-hidden '>
			<Link
				className='text-gray-700 cursor-pointer block'
				to={`/product6/${id}`}>
				<div className='px-6 py-4'>
					<p className='font-bold text-xl mb-2'>{name}</p>
					<p className='text-gray-700 text-base mb-2'>{desc}</p>
					<p className='font-bold text-md mb-2'>{address}</p>
				</div>
			</Link>
		</div>
	);
};
