import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FaGoogle, FaFacebook, FaEnvelope, FaPhone } from 'react-icons/fa';
import Image5 from '../assets/img13.png';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FaApple } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { AccessSubProducts3 } from './AccessSubProducts3';

const AccessProducts3 = () => {
	const { productid } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const { houses, currency } = useContext(ShopContext);
	const [productData, setProductData] = useState(false);

	const fetchData = () => {
		const product = houses.find((item) => item._id == productid);
		if (product) {
			setProductData(product);
		} else {
			console.log('Product not found!');
		}
	};

	useEffect(() => {
		fetchData();
	}, [houses, productid]);

	return productData ? (
		<>
			<div className='pt-10 transition-opacity ease-in duration-500 container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col lg:flex-row gap-8'>
					<div className='w-full lg:w-2/3 border border-gray-300 rounded-xl p-4 sm:p-6 bg-gray-100'>
						<img
							data-aos='fade-right'
							src={productData.image}
							className='w-full max-w-full max-h-[500px] lg:max-h-[700px] object-contain mx-auto'
							alt={productData.description}
						/>
					</div>

					<div className='w-full h-[300px] lg:w-1/3 border border-gray-300 rounded-xl p-4 sm:p-6 flex flex-col gap-4'>
						<h1 className='text-2xl font-bold'>Listed by private user</h1>
						<div className='flex gap-4 items-center'>
							<img
								src={Image5}
								className='w-16 h-16 rounded-full border-2 border-gray-300 object-cover'
								alt='Seller'
							/>
							<div className='flex flex-col justify-center'>
								<h2 className='text-xl font-bold'>BranHd</h2>
								<p>Member since 2022</p>
							</div>
						</div>
						<button
							onClick={() => setIsOpen(true)}
							className='w-full flex items-center text-white justify-center gap-2 rounded-md py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:brightness-110'>
							<FaPhone className='text-xl' />
							Show phone number
						</button>
						<button
							onClick={() => setIsOpen(true)}
							className='w-full flex items-center justify-center gap-2 border border-gray-400 rounded-md py-3 cursor-pointer'>
							<IoChatbubbleOutline className='text-xl' />
							Chat
						</button>
					</div>
				</div>

				<div className='w-full sm:w-1/2 border border-gray-300 rounded-xl py-6 px-4 sm:px-8 my-8'>
					<h1 className='py-4 text-2xl sm:text-3xl font-bold'>
						{productData.name}
					</h1>
					<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
						<p className='flex text-xl items-center gap-2'>
							<IoLocationOutline />
							{productData.address}
						</p>
					</div>
				</div>

				<div className='w-full sm:w-1/2 border border-gray-300 rounded-xl py-6 px-4 sm:px-8 my-8'>
					<h1 className='text-3xl pb-6 font-bold'>Description</h1>
					<p style={{ whiteSpace: 'pre-line' }}>{productData.description}</p>
				</div>

				<AccessSubProducts3 category={productData.category} />
			</div>

			{isOpen && (
				<div className='fixed inset-0 z-99 backdrop-blur-md flex items-center justify-center'>
					<div className='bg-white rounded-lg p-6 w-full max-w-[400px] shadow-lg relative mx-4'>
						<button
							onClick={() => setIsOpen(false)}
							className='absolute top-4 font-bold cursor-pointer right-4 text-3xl'>
							&times;
						</button>

						<div className='flex justify-center mb-4'>
							<h1 className='text-3xl font-bold'>NSS</h1>
						</div>

						<h2 className='text-center text-xl font-semibold text-gray-800'>
							Login into your NSS account
						</h2>
						<div className='space-y-1 mt-5'>
							<input
								type='text'
								id='emailOrUsername'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
								placeholder='Enter your email or username'
							/>
						</div>

						<div className='space-y-1 mt-3'>
							<input
								type='password'
								id='password'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
								placeholder='Enter your password'
							/>
						</div>

						<p className='text-center my-3 text-md cursor-pointer underline'>
							Forgot Password?
						</p>

						<button className='w-full cursor-pointer bg-black text-white rounded-full py-2'>
							Login
						</button>

						<div className='mt-6 space-y-3'>
							<div className='flex items-center my-3'>
								<div className='flex-grow border-t border-gray-300'></div>
								<span className='px-3 text-gray-500'>OR</span>
								<div className='flex-grow border-t border-gray-300'></div>
							</div>

							<button className='w-full flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 cursor-pointer transition'>
								<FaApple className='text-xl' />
								Continue with Apple
							</button>
							<button className='w-full flex items-center justify-center gap-2 border border-gray-400 rounded-full py-2 cursor-pointer'>
								<FaGoogle className='text-xl' />
								Continue with Google
							</button>
						</div>

						<p className='text-center text-sm mt-4 cursor-pointer hover:underline'>
							New to NSS? Create an account
						</p>
					</div>
				</div>
			)}
		</>
	) : (
		<div className='opacity-0'> </div>
	);
};

export default AccessProducts3;
