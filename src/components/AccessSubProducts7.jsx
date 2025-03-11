import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LatestCollection5Items } from './LatestCollection5Items';

export const AccessSubProducts7 = ({ category }) => {
	const {  kids } = useContext(ShopContext);
	const [related, setRelated] = useState([]);

	useEffect(() => {
		if (kids.length > 0) {
			const filteredProducts = kids.filter(
				(item) => item.category === category
			);
			setRelated(filteredProducts);
		}
	}, [kids, category]);

	return (
		<div className='my-15'>
			<div>
				<h1
					data-aos='fade-right'
					className=' text-3xl font-semibold sm:text-left'>
					RELATED <span className='text-black'>PRODUCTS</span>
				</h1>
			</div>
			<div
				data-aos='fade-right'
				className='grid mt-10  grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6'>
				{related.map((item) => (
					<LatestCollection5Items
						key={item._id}
						id={item._id}
						image={item.image}
						price={item.price}
						name={item.name}
						desc={item.description}
						address={item.address}
						date={item.date}
					/>
				))}
			</div>
		</div>
	);
};
