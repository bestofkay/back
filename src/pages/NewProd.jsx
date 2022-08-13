/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-console */
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
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Filter, Sort, Toolbar, Edit } from '@syncfusion/ej2-react-grids';
import { FiLoader, FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { Navbar, Footer, Sidebar, ThemeSettings, Header} from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const NewProd = () => {
	const params = useParams();
	const baseURL = 'https://rapidsmm.herokuapp.com/api/';

  const toolbarOptions = ['Search', 'Print', 'Edit', 'Delete', 'Update', 'Cancel'];
  const filterOptions = {ignoreAccent: true};

  const editing = { allowDeleting: true, allowEditing: true };
  const {activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  
  const maData = null;
const [mainData, setMainData] = useState(maData);
useEffect(() => {
		const data = new DataManager({
			removeUrl: `${baseURL}fetch/product/remove`,
			updateUrl: `${baseURL}fetch/product/update`,
			url: `${baseURL}fetch/products/${params.productId}`,
			adaptor: new UrlAdaptor(),

		});
		setMainData(data);
	}, []);
 
	// eslint-disable-next-line no-empty
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
					<Header category="Products" title={`${params.productId} Products`} />
			{
			mainData == null ? (
				<h1><FiLoader /> Loading ...</h1>
			  ) : (
				<GridComponent
					width="auto"
					allowPaging
					allowSorting
					allowMultiSorting
					allowFiltering
					allowSearching
					pageSettings={{ pageSize: 10, pageSizes: true }}
					editSettings={editing}
					toolbar={toolbarOptions}
					filterSettings={filterOptions}
					printMode="CurrentPage"
					allowTextWrap
					dataSource={mainData}
				>
					
					<ColumnsDirective>
					<ColumnDirective field="title" headerText="Title" width="300" textAlign="Left" />
					<ColumnDirective field="serviceID" headerText="ID" allowEditing={false} textAlign="Left" isPrimaryKey />
					<ColumnDirective field="subcategory" headerText="Category" allowEditing={false} textAlign="Left" />
					<ColumnDirective field="price" headerText="Price" allowEditing={false} textAlign="Left" />
					<ColumnDirective field="listing_price" headerText="L/Price" editType="numericedit" textAlign="Left" />
					<ColumnDirective field="minimum" headerText="Min" textAlign="Left" />
					<ColumnDirective field="maximum" headerText="Max" textAlign="Left" />
					</ColumnsDirective>
					   <Inject services={[Search, Page, Filter, Sort, Edit, Toolbar]} />
				  </GridComponent>
			   
			  )
		}
				</div>
			  </div>
				<Footer />
			  </div>
			</div>
			
		/* FOOTER */
		  );
};
export default NewProd;
