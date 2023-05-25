import React from 'react';
import SideBar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import '../../styles/_main.scss'; 


const Layout = ({ children, className = 'content-wrapper', title = 'Dashboard' }) => {
	return (
		<div>
			<Header />
			<SideBar />
			<div className={className}>
				<section className="content-header">
					<div className="row">
						<div className="col-md-12">
							<div className="box">
								<div className="box-header with-border">
									<h2 className="box-title">{title}</h2>
								</div>
								<div className="box-body" style={{marginBottom: '8rem'}}>{children}</div>
								<Footer />
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Layout;
