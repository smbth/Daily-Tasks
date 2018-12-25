/*
 *@name    : pagination directive
 *@desc    : a custom pagination directive
 *@author  : sambath
 *@example : <fs-myapp-pagination></fs-myapp-pagination>
 */

(function(){
	angular
	.module('myApp')
	.directive('fsMyappPagination',directive);
	function directive(paginationService){
		let directive = {
			link : link,
			templateUrl : `app/pagination/templates/pagination.template.html`,
			restrict : `EA`,
			scope : { config : "=" , id : "@" }
		} 
		return directive;
		function link(scope,element,attrs){

			scope.tableData        = [];
			scope.itemsPerPage     = 7;
			scope.currentPage      = 1;
			let pageNumbersPerPage = 8;
			scope.warningItems     = false;
			scope.warningCurrentPage = false;

			scope.$watch('config',function(){

				if(scope.config){
					// business logic goes here
					scope.totalPages = Math.ceil(scope.config.length / scope.itemsPerPage); 
					scope.$watch('currentPage',function(){
						if(scope.currentPage >= 1 && scope.currentPage <= scope.totalPages && scope.currentPage%1 === 0 || scope.currentPage === null){
							scope.warningCurrentPage = false;
							changePageConfig();
						}
						else{
							scope.warningCurrentPage = true;
						}
						// changePageConfig();
					});

					scope.$watch('itemsPerPage',function(){
						if(scope.itemsPerPage >= 1 && scope.itemsPerPage <= scope.config.length && scope.itemsPerPage%1 === 0 || scope.itemsPerPage === null){
							scope.warningItems = false;
							// scope.$apply();
						}
						else{
							scope.warningItems = true;
							// scope.$apply();
						}
					})
					var buttons = document.getElementsByClassName("navigation_input");
					buttons[0].addEventListener("keyup",function(event){
						event.preventDefault();
						if(event.keyCode === 13){
							scope.totalPages = Math.ceil(scope.config.length / scope.itemsPerPage);
							if(scope.itemsPerPage >= 1 && scope.itemsPerPage <= scope.config.length && scope.itemsPerPage%1 === 0 || scope.itemsPerPage === null){
								if(scope.currentPage > scope.totalPages){
									scope.currentPage = 1;
								}
								// scope.warning = false;
								changePageConfig();
								scope.$apply();
							}
							else{
								// scope.warning = true;
								// scope.$apply();
							}
						}
					});

					function changePageConfig(){
						if(scope.currentPage != null && scope.itemsPerPage != null){
							let pageStartItem = ((scope.currentPage - 1) * scope.itemsPerPage);
							let pageEndItem = pageStartItem + scope.itemsPerPage;
							scope.tableData = scope.config.slice(pageStartItem,pageEndItem);

							// to calculate page number
							// scope.totalPages = Math.ceil(scope.config.length / scope.itemsPerPage);
							scope.pageNumberArray = paginationService.setPages(scope.totalPages,pageNumbersPerPage,scope.currentPage);		
						}
					}			
			    }
			});

			scope.getPrevPage = getPrevPage;
			scope.getNextPage = getNextPage;
			scope.getPage     = getPage;

			function getPage(page){
				scope.currentPage = page;
			}

			function getPrevPage(){
				if(scope.currentPage > 1){
					scope.currentPage--;
				}
			}

			function getNextPage(){
				if(scope.currentPage < scope.totalPages){
					scope.currentPage++;
				}
			}
		}

	}
	directive.$inject = ['paginationService'];
})()