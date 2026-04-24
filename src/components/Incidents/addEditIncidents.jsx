import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const IncidentFormModal = ({ show, onClose, incident, onSave }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        severity: 'Medium',
        affectedService: '',
        status: 'Open',
        assignedTo: '',
        createdAt: '',
        resolvedAt: '',
        comments: ''
    });

    useEffect(() => {
        if (incident) {
            setFormData({
                id: incident.id,
                title: incident.title,
                severity: incident.severity,
                affectedService: incident.affectedService,
                status: incident.status,
                assignedTo: incident.assignedTo,
                createdAt: incident.createdAt,
                resolvedAt: incident.resolvedAt || '',
                comments: incident.comments || ''
            });
        } else {
            const now = new Date().toISOString().split('T')[0];
            setFormData({
                id: `INC-${Math.floor(Math.random() * 10000)}`,
                title: '',
                severity: 'Medium',
                affectedService: '',
                status: 'Open',
                assignedTo: '',
                createdAt: now,
                resolvedAt: '',
                comments: ''
            });
        }
    }, [incident, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-plus-circle me-2"></i>
                            {incident ? 'Edit Incident' : 'Add New Incident'}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row g-3">
                                {/* Incident ID */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Incident ID <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        required
                                        readOnly={!!incident}
                                    />
                                    {incident && <small className="text-muted">ID cannot be changed in edit mode</small>}
                                </div>

                                {/* Title */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter incident title"
                                    />
                                </div>

                                {/* Severity */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Severity <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="severity"
                                        value={formData.severity}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Critical">Critical</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>

                                {/* Affected Service */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Affected Service <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="affectedService"
                                        value={formData.affectedService}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., Database, API, Frontend"
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Status <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>

                                {/* Assigned To */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Assigned To <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="assignedTo"
                                        value={formData.assignedTo}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter assignee name"
                                    />
                                </div>

                                {/* Created At */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Created At
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="createdAt"
                                        value={formData.createdAt}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Resolved At */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold text-start d-block">
                                        Resolved At
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="resolvedAt"
                                        value={formData.resolvedAt}
                                        onChange={handleChange}
                                        placeholder="Leave empty if not resolved"
                                    />
                                </div>

                                {/* Comments - Full Width */}
                                <div className="col-12">
                                    <label className="form-label fw-bold text-start d-block">
                                        Comments
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Add any additional comments here..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                <i className="bi bi-x-circle me-2"></i>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-save me-2"></i>
                                {incident ? 'Update Incident' : 'Add Incident'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IncidentFormModal;