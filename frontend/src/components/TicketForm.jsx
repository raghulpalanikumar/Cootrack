import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createTicket, classifyTicket } from '../api';

const TicketForm = ({ onTicketCreated }) => {
    const [loading, setLoading] = useState(false);
    const [classifying, setClassifying] = useState(false);
    const [suggested, setSuggested] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: 'general',
            priority: 'low',
        },
        validationSchema: Yup.object({
            title: Yup.string().max(200, 'Must be 200 characters or less').required('Required'),
            description: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            priority: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                await createTicket(values);
                resetForm();
                setSuggested(null);
                if (onTicketCreated) onTicketCreated();
            } catch (error) {
                console.error('Submission error:', error);
            } finally {
                setLoading(false);
            }
        },
    });

    // Debounced or onBlur classification? The requirement says "as the user types (or on blur/submit)".
    // Let's us onBlur for simplicity and prevent too many API calls.
    const handleDescriptionBlur = async (e) => {
        formik.handleBlur(e);
        const desc = e.target.value;
        if (desc && desc.length > 10 && !classifying) {
            setClassifying(true);
            try {
                const result = await classifyTicket(desc);
                if (result) {
                    if (result.suggested_category) formik.setFieldValue('category', result.suggested_category);
                    if (result.suggested_priority) formik.setFieldValue('priority', result.suggested_priority);
                    setSuggested(result);
                }
            } catch (err) {
                console.error('Classification failed:', err);
            } finally {
                setClassifying(false);
            }
        }
    };

    return (
        <div className="ticket-form card">
            <h3>Submit a Ticket</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="input-field"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="input-field textarea"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={handleDescriptionBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description ? <div className="error">{formik.errors.description}</div> : null}
                    {classifying && <span className="loading-badge">AI Classifying...</span>}
                    {suggested && !classifying && <span className="success-badge">AI Suggested: {suggested.suggested_category} / {suggested.suggested_priority}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="input-field"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                        >
                            <option value="billing">Billing</option>
                            <option value="technical">Technical</option>
                            <option value="account">Account</option>
                            <option value="general">General</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            className="input-field"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.priority}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={loading || classifying} className="btn-primary">
                    {loading ? 'Submitting...' : 'Submit Ticket'}
                </button>
            </form>
        </div>
    );
};

export default TicketForm;
