import React, { useMemo } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import Image3 from '../assets/logo.png';

const Footer = () => {
	const { pathname } = useLocation();
	const hideFooterForPages = ['/post-ad'];

	const hideFooter = useMemo(
		() => hideFooterForPages.includes(pathname),
		[pathname]
	);
	return hideFooter ? null : (
		<footer className='bg-gray-100 text-gray-800'>
			<div className='container mx-auto px-6 py-10'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{/* Logo & Description */}
					<div className='space-y-4'>
						<div className='flex items-center gap-3'>
							<NavLink to='/'>
								<img
									src={Image3}
									alt='Logo'
									className='w-20 md:w-24 cursor-pointer object-contain'
								/>
							</NavLink>
							<h1 className='hidden md:block text-3xl'>|</h1>
							<h1 className='text-lg italic font-serif'>
								Connect with your community
							</h1>
						</div>
						<p className='text-sm'>
							A community-driven platform that enables users to rent, share &
							borrow items seamlessly. NSS fosters trust and sustainability by
							connecting neighbors for resource sharing.
						</p>
					</div>

					{/* Most Used Categories */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>MOST USED CATEGORIES</h3>
						<ul className='space-y-2 text-sm'>
							{['Items for sale', 'Items for rent', 'Events', 'Services'].map(
								(category, index) => (
									<li key={index}>
										<a
											href={`/collection${index + 1}`}
											className='hover:text-blue-600 transition duration-300'>
											{category}
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Industries */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>INDUSTRIES</h3>
						<ul className='space-y-2 text-sm'>
							{[
								'Home & Garden',
								'Real Estate',
								'Professional Services',
								'Food & Entertainment',
							].map((industry, index) => (
								<li key={index}>
									<a
										href='#'
										className='hover:text-blue-600 transition duration-300'>
										{industry}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contact & Social Media */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>FOLLOW US</h3>
						<div className='flex space-x-4 text-lg'>
							<NavLink
								to='https://www.instagram.com/sharewithnss?igsh=MWE5ZjJlbHVrbW1heQ=='
								target='_blank'
								className='hover:scale-110 transition transform duration-300'>
								<FaInstagram className='text-2xl hover:text-pink-500' />
							</NavLink>
							<NavLink
								to='https://www.facebook.com/share/15Gu8UZNcP/?mibextid=wwXIfr'
								target='_blank'
								className='hover:scale-110 transition transform duration-300'>
								<FaFacebookF className='text-2xl hover:text-blue-600' />
							</NavLink>
						</div>
						<h3 className='font-bold text-lg'>CONTACT US</h3>
						<p
							className='text-lg  font-semibold underline cursor-pointer'
							onClick={() =>
								window.open(
									'https://mail.google.com/mail/?view=cm&fs=1&to=connect2nss@gmail.com',
									'_blank'
								)
							}>
							connect2nss@gmail.com
						</p>
					</div>
				</div>
			</div>

			<div className='bg-blue-950 text-white py-3 text-center text-sm'>
				© 2025 NSS - Free Classifieds in Your Country
			</div>
		</footer>
	);
};

export default Footer;
