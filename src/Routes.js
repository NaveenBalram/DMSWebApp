import React, { PureComponent } from 'react';
import loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/Spinner/Spinner';

const load = loader => loadable({ loader, loading:Spinner });

const LandingPage = load(() => import('./containers/LandingPage/LandingPage'));
const SignInPage = load(() => import('./containers/SignInPage/SignInPage'));
const SignUpPage = load(() => import('./containers/SignUpPage/SignUpPage'));
const ProductListPage = load(() => import('./containers/ProductsListPage/ProductListPage'));
const AccountInformationPage = load(() => import('./containers/MyAccountInformation/MyAccountInformation'));
const HelpDeskPage = load(() => import('./containers/HelpDeskPage/HelpDeskPage'));
const ContactUsPage = load(() => import('./containers/ContactUs/ContactUsPage'));
const DonorProfilePage = load(()=> import('./containers/DonorProfilePage/DonorProfilePage'));
const DonationPage = load(()=> import('./containers/DonationsPage/DonationPage'));
const DonorsDashboardPage = load(()=> import('./containers/DonorsDashboardPage/DonorsDashboardPage'));
const DonorInformationPage = load(()=> import('./containers/DonorInformationPage/DonorInformationPage'));
const DonorProposalPage = load(()=>import('./containers/DonorProposalPage/DonorProposalPage'));

export default class Routes extends PureComponent {
  render() {
    return (
      <Switch>
        <Route component={LandingPage} exact path="/" />
        <Route component={SignInPage} exact path="/signIn" />
        <Route component={SignUpPage} exact path="/signUpPage" />
        <Route component={ProductListPage} exact path="/productPage" />
        <Route component={AccountInformationPage} exact path="/accountInfoPage" />
        <Route component={HelpDeskPage} exact path="/helpDeskPage"/>
        <Route component={ContactUsPage} exact path="/contactUsPage"/>
        <Route component={DonorProfilePage} exact path="/donorProfilePage"/>
        <Route component={DonationPage} exact path="/donationPage"/>
        <Route component={DonorsDashboardPage} exact path="/donorsDashboardPage"/>
        <Route component={DonorInformationPage} exact path="/donorInformationPage"/>
        <Route component={DonorProposalPage} exact path="/donorProposalPage"/>
      </Switch>
    );
  }
}

