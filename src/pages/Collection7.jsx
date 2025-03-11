import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowForward } from 'react-icons/io';
import { LatestCollection7Items } from '../components/LatestCollection7Items';

const Collection7 = () => {
	const { kids } = useContext(ShopContext);
	const [value, setValue] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState(null);

	const handleFilter = (e) => {
		const selectedCategory = e.target.value;
		setCategory((prev) =>
			prev === selectedCategory ? null : selectedCategory
		);
	};

	const applyFilter = () => {
		let copy = kids.slice();
		if (category) {
			copy = copy.filter((item) => item.category === category);
		}

		setFilterProducts(copy);
	};

	useEffect(() => {
		applyFilter();
	}, [category]);

	useEffect(() => {
		setFilterProducts(kids);
	}, [kids]);

	return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 py-10'>
			<div className='min-w-[200px] mt-16 sm:min-w-[250px]'>
				<p
					onClick={() => {
						setValue(!value);
					}}
					className='ml-6 text-2xl mt-[-45px] mb-10 font-semibold flex items-center cursor-pointer gap-2 transition duration-300 ease-in-out sm:hidden'>
					Filter
					<IoIosArrowForward
						className={`pt-1 transform ${
							value ? 'rotate-90' : ''
						} transition-transform duration-300`}
					/>
				</p>

				<div
					className={`ml-5 p-4 mt-4 border border-gray-300 transition-all duration-300 ease-in-out ${
						value ? '' : 'hidden sm:block'
					}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>CATEGORIES</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='checkbox'
								className='accent-[#090909]  w-4 h-4'
								checked={category?.includes('Mobiles') || false}
								onChange={() => handleFilter({ target: { value: 'Mobiles' } })}
							/>
							<span>Mobiles</span>
						</label>
						<hr className='border-t border-gray-300' />
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='checkbox'
								className='accent-[#090909]  w-4 h-4'
								checked={category?.includes('Houses') || false}
								onChange={() => handleFilter({ target: { value: 'Houses' } })}
							/>
							<span>Houses</span>
						</label>
						<hr className='border-t border-gray-300' />
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='checkbox'
								className='accent-[#090909] w-4 h-4'
								checked={category?.includes('Cars') || false}
								onChange={() => handleFilter({ target: { value: 'Cars' } })}
							/>
							<span>Cars</span>
						</label>
						<hr className='border-t border-gray-300' />
					</div>
				</div>
			</div>

			<div className='flex-1'>
				<div className='mb-10 '>
					<h1
						data-aos='fade-right'
						className='sm:text-5xl text-3xl ml-7 font-semibold mt-5 sm:text-left'>
						SERVICES{' '}
					</h1>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 justify-items-center'>
					{filterProducts.map((item, index) => (
						<div
							data-aos='fade-right'
							key={index}
							className='w-full max-w-[280px] bg-white pb-4 '>
							<LatestCollection7Items
								id={item._id}
								image={item.image}
								price={item.price}
								name={item.name}
								desc={item.description}
								address={item.address}
								date={item.date}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Collection7;
