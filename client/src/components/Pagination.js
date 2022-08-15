import React from "react";
import { Pagination, PaginationItem } from  '@mui/material';
import { Link } from 'react-router-dom';

const Paginate = () => {
    return (
        <Pagination
            // classes = {{ ul: classes.ul }}
            count={5}
            page={1}
            variant="outlined"
            color="primary"
            renderItem = {(item) => (
                <PaginationItem {...item} component={Link} to={`/items?page=${1}`}/>
            )}
        />
    );
};
export default Paginate;