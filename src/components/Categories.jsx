import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Image1 from '../assets/logo1.png';
import Image2 from '../assets/logo2.png';
import Image3 from '../assets/logo3.png';
import Image4 from '../assets/logo4.png';
import Image5 from '../assets/logo5.png';
import Image6 from '../assets/logo6.png';
import Image7 from '../assets/logo7.png';

const Categories = () => {
	return (
		<>
			<h1
				data-aos='fade-right'
				className='text-3xl px-7 mt-10 font-semibold text-center sm:text-left'>
				ALL <span className='text-black'>CATEGORIES</span>
			</h1>
			<div className='flex flex-wrap justify-center gap-4 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:gap-12 md:px-8 md:py-12 lg:gap-16 lg:px-10 lg:py-14 xl:gap-20 xl:px-12 xl:py-16'>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection'}>
						<img
							src={Image7}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>
						Items for sale
					</p>
				</div>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection4'}>
						<img
							src={Image4}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>
						Items to share
					</p>
				</div>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection2'}>
						<img
							src={Image1}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>
						Items for rent
					</p>
				</div>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection6'}>
						<img
							src={Image2}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>Items request</p>
				</div>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection5'}>
						<img
							src={Image6}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>Resources</p>
				</div>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection3'}>
						<img
							src={Image3}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>Events</p>
				</div>
				<div
					className='flex flex-col items-center'
					style={{ cursor: 'pointer' }}>
					<NavLink to={'/collection7'}>
						<img
							src={Image5}
							className='w-30 h-30 rounded-full border-2 border-gray-300 object-cover'
						/>
					</NavLink>
					<p className='mt-2 text-gray-700 text-2xl font-bold'>Services</p>
				</div>
			</div>
		</>
	);
};

export default Categories;
