import React, { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import IncidentFormModal from './addEditIncidents'; 

const Incidents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingIncident, setEditingIncident] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [incidentToDelete, setIncidentToDelete] = useState(null);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const response = await fetch('src/assets/incidents.json');
                const data = await response.json();
                console.log('Fetched incidents:', data);
                setIncidents(data);
            } catch (error) {
                console.error('Error fetching incidents:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchIncidents();
    }, []);

    const filteredIncidents = incidents.filter((incident) => {
        const matchFilter = statusFilter === 'all' || incident.status === statusFilter;
        const matchSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            incident.affectedService.toLowerCase().includes(searchTerm.toLowerCase());
        return matchFilter && matchSearch;
    });

    const getSeverityBadgeClass = (severity) => {
        switch (severity) {
            case 'Critical':
                return 'bg-danger';
            case 'High':
                return 'bg-warning text-dark';
            case 'Medium':
                return 'bg-info';
            case 'Low':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Open':
                return 'bg-danger';
            case 'In Progress':
                return 'bg-warning text-dark';
            case 'Pending':
                return 'bg-info';
            case 'Resolved':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    const handleAddIncident = () => {
        setEditingIncident(null);
        setShowModal(true);
    };

    const handleEditIncident = (incidentId) => {
        const incidentToEdit = incidents.find(inc => inc.id === incidentId);
        setEditingIncident(incidentToEdit);
        setShowModal(true);
    };

    const handleDeleteClick = (incidentId) => {
        setIncidentToDelete(incidentId);
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        setIncidents(incidents.filter(inc => inc.id !== incidentToDelete));
        setShowDeleteConfirm(false);
        setIncidentToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
        setIncidentToDelete(null);
    };

    const handleSaveIncident = (incidentData) => {
        if (editingIncident) {
            setIncidents(incidents.map(inc => 
                inc.id === incidentData.id ? incidentData : inc
            ));
        } else {
            setIncidents([incidentData, ...incidents]);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid p-3 min-vh-100 default-bg-color mt-3">
            <IncidentFormModal
                show={showModal}
                onClose={() => setShowModal(false)}
                incident={editingIncident}
                onSave={handleSaveIncident}
            />

            {showDeleteConfirm && (
                <div className="modal show d-flex align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Confirm Delete
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCancelDelete}></button>
                            </div>
                            <div className="modal-body">
                                <p className="mb-0">Are you sure you want to delete this incident?</p>
                                <small className="text-muted">This action cannot be undone.</small>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                                    <i className="bi bi-x-circle me-2"></i>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                                    <i className="bi bi-trash me-2"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="text-dark fw-bold m-0">
                    <i className="bi bi-clipboard-check me-2 text-primary"></i>
                    Incident Management
                </h5>
                <button
                    className="btn btn-primary"
                    onClick={handleAddIncident}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Incident
                </button>
            </div>

            <div className="card border-0 mb-4 shadow-sm">
                <div className="card-body">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <label className="form-label text-dark fw-bold">Search</label>
                            <div className="input-group">
                                <span className="input-group-text bg-light border-secondary">
                                    <i className="bi bi-search text-dark"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control bg-white text-dark border-secondary"
                                    placeholder="Search by Incident ID, Title, or Service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="col-md-4">
                            <label className="form-label text-dark fw-bold">Filter by Status</label>
                            <select
                                className="form-select bg-white text-dark border-secondary"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </div>

                        <div className="col-md-4 text-md-end">
                            <small className="text-muted">
                                Showing {filteredIncidents.length} of {incidents.length} incidents
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card shadow-sm'>
                <div className="card-header bg-white">
                    <h5 className='card-title mb-0'>
                        <i className="bi bi-list-ul me-2"></i>
                        Incident List
                    </h5>
                </div>
            </div>
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table className="table table-light table-striped table-bordered table-hover border mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col" className="text-white fw-bold">Incident ID</th>
                            <th scope="col" className="text-white fw-bold">Title</th>
                            <th scope="col" className="text-white fw-bold">Severity</th>
                            <th scope="col" className="text-white fw-bold">Affected Service</th>
                            <th scope="col" className="text-white fw-bold">Status</th>
                            <th scope="col" className="text-white fw-bold">Assigned To</th>
                            <th scope="col" className="text-white fw-bold">Created At</th>
                            <th scope="col" className="text-white fw-bold">Resolved At</th>
                            <th scope="col" className="text-white fw-bold">Comments</th>
                            <th scope="col" className="text-white fw-bold" style={{ whiteSpace: 'nowrap' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIncidents.length > 0 ? (
                            filteredIncidents.map((incident) => (
                                <tr key={incident.id}>
                                    <td className="text-primary fw-bold">{incident.id}</td>
                                    <td className="text-dark">{incident.title}</td>
                                    <td>
                                        <span className={`badge ${getSeverityBadgeClass(incident.severity)}`}>
                                            {incident.severity}
                                        </span>
                                    </td>
                                    <td className="text-dark">{incident.affectedService}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadgeClass(incident.status)}`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="text-dark">{incident.assignedTo}</td>
                                    <td className="text-muted">{incident.createdAt}</td>
                                    <td className="text-muted">{incident.resolvedAt}</td>
                                    <td className="text-muted">
                                        <small>{incident.comments}</small>
                                    </td>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() => handleEditIncident(incident.id)}
                                            title="Edit incident"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDeleteClick(incident.id)}
                                            title="Delete incident"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center text-muted py-4">
                                    <i className="bi bi-inbox fs-3 me-2"></i>
                                    No incidents found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Incidents;