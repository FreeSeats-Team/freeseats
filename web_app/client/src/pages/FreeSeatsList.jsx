import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

function FreeSeatsList() {
    const [is_loading, set_is_loading] = useState(false);
    const [freeseat_data, set_freeseat_data] = useState([]);

    useEffect(() => {
        set_is_loading(true);
        
        async function fetchData() {
            await api.getAllFreeSeats().then(res => {
                set_freeseat_data(res.data);
                set_is_loading(false);
            });
        };
        fetchData();
    }, []);
    
    const columns = [
        {
            Header: 'Space',
            accessor: '_id',
            filterable: true,
        },
        {
            Header: 'Free Seats',
            accessor: 'seats',
            Cell: function(props) {
                console.log(Object.keys(props.original.seats).length)
                return (
                    <span>{Object.keys(props.original.seats).length}</span>
                )
            },
        },
    ]
    
    let showTable = true
    if (!freeseat_data) {
        showTable = false
    }
    if (!is_loading) {
        console.log(freeseat_data.data)
    }
    else {
        console.log("Loading")
    }

    return (
        <Wrapper>
            {showTable && (
                <ReactTable
                    data={freeseat_data.data}
                    columns={columns}
                    loading={is_loading}
                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                />
            )}
        </Wrapper>
    )
}

export default FreeSeatsList