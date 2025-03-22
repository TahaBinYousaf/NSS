import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { IoIosArrowForward } from 'react-icons/io';
import { LatestCollection1Items } from '../components/LatestCollection1Items';

const Collection = () => {
	const { mobiles } = useContext(ShopContext);
	const [filterMenuOpen, setFilterMenuOpen] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [filterOption, setFilterOption] = useState('Featured');

	const handleFilterChange = (option) => {
		setFilterOption(option === filterOption ? 'Featured' : option);
	};

	// Apply filters and sorting based on selected option
	const applyFiltersAndSort = () => {
		let copy = [...mobiles];
		
		// Apply sorting based on selected option
		switch(filterOption) {
			case 'Date - old to new':
				copy.sort((a, b) => new Date(a.date) - new Date(b.date));
				break;
			case 'Date - new to old':
				copy.sort((a, b) => new Date(b.date) - new Date(a.date));
				break;
			case 'Featured':
			default:
				// You could implement featured sorting logic here
				// For now, using default order
				break;
		}
		
		setFilteredProducts(copy);
	};

	// Update filtered products when filterOption or mobiles change
	useEffect(() => {
		applyFiltersAndSort();
	}, [filterOption, mobiles]);

	return (
		<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 py-10'>
			{/* Filter sidebar */}
			<div className='min-w-[200px] mt-16 sm:min-w-[250px]'>
				<p
					onClick={() => setFilterMenuOpen(!filterMenuOpen)}
					className='ml-6 text-2xl mt-[-45px] mb-10 font-semibold flex items-center cursor-pointer gap-2 transition duration-300 ease-in-out sm:hidden'>
					Filter
					<IoIosArrowForward
						className={`pt-1 transform ${
							filterMenuOpen ? 'rotate-90' : ''
						} transition-transform duration-300`}
					/>
				</p>

				<div
					className={`ml-5 p-4 mt-4 border border-gray-300 transition-all duration-300 ease-in-out ${
						filterMenuOpen ? '' : 'hidden sm:block'
					}`}>
					<p className='mb-3 text-lg font-semibold text-gray-800'>SORT BY</p>
					<div className='flex flex-col gap-3 text-sm font-medium text-gray-600'>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='radio'
								name="filterOption"
								className='accent-[#090909] w-4 h-4'
								checked={filterOption === 'Featured'}
								onChange={() => handleFilterChange('Featured')}
							/>
							<span>Featured</span>
						</label>
						<hr className='border-t border-gray-300' />
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='radio'
								name="filterOption"
								className='accent-[#090909] w-4 h-4'
								checked={filterOption === 'Date - old to new'}
								onChange={() => handleFilterChange('Date - old to new')}
							/>
							<span>Date - old to new</span>
						</label>
						<hr className='border-t border-gray-300' />
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='radio'
								name="filterOption"
								className='accent-[#090909] w-4 h-4'
								checked={filterOption === 'Date - new to old'}
								onChange={() => handleFilterChange('Date - new to old')}
							/>
							<span>Date - new to old</span>
						</label>
						<hr className='border-t border-gray-300' />
					</div>
				</div>
			</div>

			{/* Items display */}
			<div className='flex-1'>
				<div className='mb-10'>
					<h1
						data-aos='fade-right'
						className='sm:text-5xl text-3xl ml-7 font-semibold mt-5 sm:text-left'>
						ITEMS FOR SALE
					</h1>
				</div>
				<div className='mt-[80px] sm:mt-8 mb-5 flex flex-wrap gap-4 justify-center px-4 sm:px-0'>
					{filteredProducts.length > 0 ? (
						filteredProducts.map((item, index) => (
							<div
								data-aos='fade-right'
								key={index}
								className='w-full sm:w-[48%] md:w-[31%] lg:w-[23%] pb-2 bg-white rounded-lg'>
								<LatestCollection1Items
									id={item._id}
									image={item.image}
									price={item.price}
									name={item.name}
									desc={item.description}
									address={item.address}
									date={item.date}
									condition={item.condition}
								/>
							</div>
						))
					) : (
						<p className="text-center w-full text-gray-500 py-10">No items found.</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Collection;