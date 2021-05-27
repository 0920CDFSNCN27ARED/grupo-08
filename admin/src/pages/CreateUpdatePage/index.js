import './styles.scss';

import { useState, useEffect } from 'react';

// Components
import ContentHeader from '../../components/ContentHeader';
import DataList from '../../components/DataList';

const CreateUpdatePage = (props) => {
    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const getRoles = async () => {
            let _roles = await fetch('http://localhost:3001/api/v1/roles/');
            _roles = await _roles.json();

            setAllRoles(_roles.roles);
        };
        getRoles();
    }, []);

    return (
        <>
            <ContentHeader
                title="Gestionar roles"
                link="/admin/employees/crear-rol"
                linkName="Roles"
            />

            <div className="content_form">
                <DataList title="Roles" data={allRoles} />
            </div>
            <div className="roles_form"></div>
        </>
    );
};

export default CreateUpdatePage;
