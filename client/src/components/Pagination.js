// import React, {useEffect} from "react";
// import Pagination from  'react-bootstrap/Pagination';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { getItems } from "../actions/items";

// const Paginate = ({ page }) => {
//     const dispatch = useDispatch();
//     const { numberOfPages } = useSelector((state) => state.items);
//     useEffect(() => {
//         if(page) dispatch(getItems(page));
//     },[page]);

//     return (
//         <Pagination
//             // classes = {{ ul: classes.ul }}
//             count={numberOfPages}
//             page={Number(page) || 1}
//             variant="outlined"
//             color="primary"
//         >


//         </Pagination>
//             renderItem = {(item) => (
//                 <Pagination.Item {...item} component={Link} to={`/items?page=${item.page}`}/>
//             )}
//         />
//     );
// };
// export default Paginate;