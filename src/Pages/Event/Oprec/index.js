import React, {useEffect, useState} from 'react';
import {getAllMemberOprecService} from "../../../Services";
import LoadingPage from "../../../Components/Parts/LoadingPage";
import TitlePage from "../../../Components/Parts/TitlePage";
import DataTable from "react-data-table-component";
import {customStyles} from "./style.oprec";
import { BiChevronDown } from "react-icons/bi";
import {dateFormat} from "../../../Utils/Helper";


const OprecPage = () => {
    const [loading, setLoading] = useState(false);
    const [dataOprec, setDataOprec] = useState([]);

    const getAllMemberOprec = () => {
        getAllMemberOprecService().then((data) => {
            setDataOprec(data.data.data)
            setLoading(true)
        }).catch((error) => {
            console.log("getAllMemberOprec ", error)
        })
    }

    useEffect(() => {
        getAllMemberOprec()
    }, [loading])

    const columns = [
        {
            name: "Name",
            selector: "name",
        },
        {
            name: "Institute",
            selector: "institute",
        },
        {
            name: "Gender",
            selector: "gender",
        },
        {
            name: "Date",
            selector: "createdAt",
            cell: (date) => (
                dateFormat(date.createdAt, 'DD MMMM YYYY')
            )
        },
    ];


    return (
        <>
            {loading === false ? (
                <LoadingPage/>
            ) : (
                <>
                    <TitlePage title="List Member Open Recruitment" description="Oprec Page"/>
                    <div className="-mt-10 px-5">
                        <div className="border bg-white rounded-md p-5 w-full h-auto">
                            <DataTable
                                columns={columns}
                                data={dataOprec}
                                title="List Member Oprec"
                                noDataComponent="No Data"
                                className="border-2 rounded"
                                pagination
                                striped={true}
                                customStyles={customStyles}
                                sortIcon={<BiChevronDown />}
                                defaultSortField="createdAt"
                                defaultSortAsc="createdAt"
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OprecPage;
