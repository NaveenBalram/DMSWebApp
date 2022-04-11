import React, { Component } from "react";
import styles from "./ProductListPage.module.scss";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import cn from "classnames";
import { getProductsRequest } from "../../actions/LandingPage";
import { connect } from "react-redux";
import { notify } from "react-notify-toast";
import Spinner from "../../components/Spinner/Spinner";
import StoreWorks from "../../components/StoreWorks/StoreWorks";
import { Helmet } from 'react-helmet';
import { scroller } from 'react-scroll';

const howStoreWorks = [
    {
        "id" : 1,
        "text" : "Life is all about making the right connections – and you’ll find them at Aflac Connect, a convenient hub for helpful products and services vetted by Aflac."
    },
    {
        "id" : 2,
        "text" : "Aflac Connect puts you in touch with trusted partners who offer the solutions today’s families are looking for. You can have complete confidence in those solutions because we’ve already done the work for you by ensuring the companies represented are reputable and negotiating rates for their products and services so you don’t have to."
    },
    {
        "id" : 3,
        "text" : "Access to Aflac Connect is open to anyone, whether you’re enrolled in one of Aflac’s plans or not. And remember, check back often because the products and services you find there will continue to change and grow."
    }
];

const consumerServiceText = [
    {
        id : 1,
        text : "   If you want to learn more about products and services available through Aflac Connect, visit each vendor’s product page."
    },
    {
        id : 2,
        text : "To request information about Aflac products, click <b><a href=" + "https://www.aflac.com/agent-locator/default.aspx" + " target=" + "_blank" + "> here </a> </b> to be connected to an Aflac agent near you",
    }
];

class ProductListPage extends Component {
  constructor() {
    super();
    this.state = {
      arrayFilter: false,
      consumerFace: false,
      businessService: false,
      isInitialLoading: false,
      productList: [],
      HeaderText: {
        h2: "All Services",
        h4: "Here are the products available in your area.",
      },
      labelStoreText: {
          StoreWork: "",
      },
      storeTriggered : false,
      storeInfo: []
    };
  }

  componentDidMount() {
    const { history, isAuthenticated, getProductsRequest } = this.props;

    if (!isAuthenticated) {
      history.push(`/signIn`);
    } else {
      const res = new Promise((resolve, reject) =>
        getProductsRequest({ reject, resolve })
      );
      res.then(() => this.handleSubmitSuccess());
      res.catch((error) => {
        notify.show(
          `An error occurred. Please try again. Technical Information: ${error}`,
          "error",
          3000
        );
      });
      this.setState({
        isInitialLoading: false,
      });
    }
  }

  handleSubmitSuccess = () => {
    const { ProductLists } = this.props;
    this.setState({
      productList: ProductLists,
      isInitialLoading: true,
    });
  };

  handleViewMore = () => {
    const { arrayFilter } = this.state;
    const { ProductLists } = this.props;
    this.setState({
      arrayFilter: !arrayFilter,
      productList: ProductLists,
    });
  };

  handleSelect = () => {
  };
  showConsumerText = () => {
    const { ProductLists } = this.props;
    this.setState({
      storeTriggered: false,
      labelStoreText:{
        StoreWork:""
       },
      HeaderText: {
        h2: "Consumer Facing",
        h4:
          "Products and services that address the needs of you and your family.",
      },
      productList: ProductLists.filter((x) => x.productCategoryId==1),
    },
    () => {
        scroller.scrollTo('productList', {
            delay: 10,
            duration: 500,
            smooth: 'easeInOutQuart',
          });
        });
  };
  showBusinessServiceText = () => {
    const { ProductLists } = this.props;
    this.setState({
      storeTriggered: false,
      labelStoreText:{
        StoreWork:""
       },
      HeaderText: {
        h2: "Business Owner Services",
        h4: "Products and services that address the needs of your business.",
      },
      productList: ProductLists.filter((x) => x.productCategoryId === 2),
    },
    () => {
        scroller.scrollTo('productList', {
            delay: 100,
            duration: 500,
            smooth: 'easeInOutQuart',
          });
    
        });
  };

  howTheStoreWorks = () => {
   this.setState({
       storeTriggered: true,
       storeInfo: howStoreWorks,
       labelStoreText:{
        StoreWork:"How the Store Works."
       },
   }, 
   () => {
    scroller.scrollTo('storeWork', {
        delay: 100,
        duration: 500,
        smooth: 'easeInOutQuart',
      });
   })
  };
  
   consumerService = () => {
    this.setState({
        storeTriggered: true,
        storeInfo: consumerServiceText,
        labelStoreText:{
         StoreWork:"Consumer Support"
        },
    },
    () => {
        scroller.scrollTo('storeWork', {
            delay: 100,
            duration: 500,
            smooth: 'easeInOutQuart',
          });
    })
   };

  render() {
    const {
      arrayFilter,
      HeaderText,
      productList,
      isInitialLoading,
      labelStoreText,
      storeTriggered,
      storeInfo,
    } = this.state;
  

    return (
      <div>
        {!isInitialLoading ? (
          <Spinner />
        ) : (
          <div className={styles.productListContainer}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Shop Page</title>
        </Helmet>
            <div className={styles.heading}>
              <h1>
                Through Aflac Connect, you now have access to services from
                Aflac’s trusted partners. Whether you own a business or are
                looking for solutions to help you or your family, Aflac Connect
                is here to assist. Click the link below each vendor to learn
                more.
              </h1>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                className={styles.buttonStyle}
                onClick={this.showConsumerText}
              >
                Consumer Facing
              </Button>
              <Button
                className={styles.buttonStyle}
                onClick={this.showBusinessServiceText}
              >
                Business Owner Services
              </Button>
            </div>
            <div className={styles.productArray}>
              <div className={styles.subHeading}>
                <h2>{HeaderText.h2}</h2>
                <h4>{HeaderText.h4}</h4>
              </div>
              <div name="productList" className={cn(styles.productIndividual)}>
                {productList.map(
                  (product, index) =>
                    (index <= 2 || arrayFilter) && (
                      <ProductCard
                        product={product}
                        handleSelect={this.handleSelect}
                        key={index}
                      />
                    )
                )}
              </div>
              <div className={styles.scrollOverlayContainer}>
                <div className={styles.scrollOverlay}>
                  <h5 className={styles.textScroll}>
                    View More
                  </h5>
                  <div
                    className={styles.chevron}
                    onClick={this.handleViewMore}
                  />
                </div>
              </div>
              <div className={styles.heading}>
                <h1>Have questions or need help?</h1>
              </div>
              <div className={styles.buttonContainer}>
                <Button className={styles.buttonStyle} onClick={this.howTheStoreWorks}>
                  How the Store Works
                </Button>
                <Button className={styles.buttonStyle} onClick={this.consumerService}>
                  Customer Services
                </Button>
              </div>
              <div name="storeWork" className={styles.heading}>
                    <h1>{labelStoreText.StoreWork}</h1>
              </div>
              {storeTriggered?(<div > 
                <StoreWorks
                  storeWork = {storeInfo}
                 />
              </div>):(<div></div>)
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}
ProductListPage.propTypes = {
  ProductLists: PropTypes.arrayOf(PropTypes.shape({})),
  highContrast: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
    push: PropTypes.func.isRequired,
  }).isRequired,
  getProductsRequest: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  highContrast: state.header.highContrast,
  isAuthenticated: state.header.isAuthenticated,
  ProductLists: state.landingPage.products,
});
const mapDispatchToProps = {
  getProductsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
