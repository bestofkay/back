/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import React, {useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page} from '@syncfusion/ej2-react-grids';
import { FiEye, FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings, Header} from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Products = () => {
	const [datasIsReturned, setdataIsReturned] = useState(false);
	const [legacyChild, setLegacyChild] = useState(null);

	const token = localStorage.getItem('accessToken');
	if (!token) {
	  return <Navigate replace to="/login" />;
	}

	const gridTemplate = (props) => (
		  <div className="">
			<a className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2" href={props.backURL} style={{background: 'rgb(26, 151, 245)'}}><FiEye /> View </a>
		  </div>
		);
	
	async function getCategories() {
		return fetch(' https://rapidsmm.herokuapp.com/api/fetch/categories', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  },
		})
		  .then((data) => data.json());
	   }

	useEffect(async () => {
		const response = await getCategories();
		setLegacyChild(response);
		setdataIsReturned(true);
	  }, []);

  const {activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  return (
	// eslint-disable-next-line indent
	/* HEADER */
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <TooltipComponent
          content="Settings"
          position="Top"
        >
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: '50%' }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>

        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
    ) : (
      <div className="w-0 dark:bg-secondary-dark-bg">
        <Sidebar />
      </div>
    )}
      <div
        className={
        activeMenu
          ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
          : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
      }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
          <Navbar />
        </div>
        <div>
          {themeSettings && (<ThemeSettings />)}

          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Products" />
		  {
			datasIsReturned ? (
   <GridComponent
			dataSource={legacyChild}
			width="auto"
			allowPaging
			allowSorting
		// eslint-disable-next-line react/jsx-closing-bracket-location
		>
            <ColumnsDirective>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<ColumnDirective field="category" headerText="Category" />
    		<ColumnDirective field="backURL" headerText="Link" template={gridTemplate} width="200" />
            </ColumnsDirective>
   		    <Inject services={[Search, Page]} />
			
          </GridComponent>
 ) : <h1> Loading </h1>
		}
        </div>
      </div>
        <Footer />
      </div>
    </div>
/* FOOTER */
  );
};
export default Products;
