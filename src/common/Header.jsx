import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const database = window.firebase.firestore();

const Header = ({ organization, setAuthUser }) => {
	const history = useHistory();
	const [organizationUrl, setOrganizationUrl] = useState(null);

	useEffect(() => {
		if (organization) {
			database
				.collection("Companies")
				.doc(organization)
				.get()
				.then((doc) => {
					setOrganizationUrl("/" + doc.data().Info.Name.replaceAll(" ", "-"));
				});
		}
	}, [organization]);

	return (
		<nav className="tp-nav" role="navigation">
			<div className="top-menu">
				<div className="container">
					<div className="row">
						<div className="col-md-2">
							<div id="tp-logo">
								<Link to={`${organizationUrl}/facilities`}>Raedam</Link>
							</div>
						</div>
						<div className="col-md-10 text-right menu-1">
							<ul>
								<li className="active">
									<Link to={`${organizationUrl}/facilities`}>Facilities</Link>
								</li>
								<li>
									<Link to={`${organizationUrl}/occupancy`}>Occupancy</Link>
								</li>
								<li>
									<Link to={`${organizationUrl}/enforcement`}>Enforcement</Link>
								</li>
								<li className="has-dropdown-custom">
									<a>Account</a>
									<ul className="dropdown-custom">
										<li>
											<Link to={`${organizationUrl}/organization`}>
												Organization
											</Link>
										</li>
										<li>
											<Link to={`${organizationUrl}/profile`}>Profile</Link>
										</li>
										<li>
											<Link to={`${organizationUrl}/messages`}>Messages</Link>
										</li>
										<li
											onClick={() => {
												window.signOut();
												setAuthUser(null);
												localStorage.removeItem("authUser");
											}}
										>
											<a>Logout</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
