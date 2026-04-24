import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const Dashboard = () => {

    const metricsData = [
        { id: 1, title: 'CPU Usage', icon: 'bi-cpu', value: '65%', status: 'text-warning' },
        { id: 2, title: 'Memory Usage', icon: 'bi-memory', value: '48%', status: 'text-info' },
        { id: 3, title: 'Disk Usage', icon: 'bi-hdd', value: '72%', status: 'text-danger' },
        { id: 4, title: 'Network Usage', icon: 'bi-diagram-3', value: '35%', status: 'text-success' }
    ];

    const lineChartData = [
        { time: "10:00", cpu: 40, memory: 30, disk: 50, network: 20 },
        { time: "10:05", cpu: 55, memory: 45, disk: 60, network: 25 },
        { time: "10:10", cpu: 65, memory: 48, disk: 72, network: 35 },
        { time: "10:15", cpu: 70, memory: 52, disk: 68, network: 40 },
        { time: "10:20", cpu: 60, memory: 50, disk: 75, network: 38 }
    ];

    const barChartData = [
        { name: "CPU", value: 65 },
        { name: "Memory", value: 48 },
        { name: "Disk", value: 72 },
        { name: "Network", value: 35 }
    ];

    return (
        <div className="container-fluid p-2 mt-3 default-bg-color overflow-hidden">
    <div className="row g-3 g-md-4 mx-0">
                {metricsData.map((metric) => (
                    <div key={metric.id} className="col-12 col-sm-6 col-lg-3">
                        <div className="card border-secondary h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-2 mb-md-3">
                                    <h6 className="card-title m-0 text-truncate">{metric.title}</h6>
                                    <i className={`bi ${metric.icon} fs-5 fs-md-4 ${metric.status}`}></i>
                                </div>
                                <div className="d-flex align-items-baseline gap-2">
                                    <span className={`fs-4 fs-md-3 fw-bold ${metric.status}`}>{metric.value}</span>
                                </div>
                                <div className="progress mt-2 mt-md-3" style={{ height: '8px' }}>
                                    <div
                                        className={`progress-bar ${metric.status.replace('text-', 'bg-')}`}
                                        role="progressbar"
                                        style={{ width: metric.value }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row mt-3 mt-md-4">
                <div className="col-12 col-xl-6 mb-3 mb-md-4">
                    <div className="card border-secondary h-100">
                        <div className="card-body">
                            <h6 className="card-title mb-2 mb-md-3">Usage Trend (Line Chart)</h6>
                            <div style={{ width: "100%", height: "clamp(220px, 40vw, 320px)" }}>
                                <ResponsiveContainer>
                                    <LineChart data={lineChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: 12 }} />
                                        <Line type="monotone" dataKey="cpu" stroke="#ffc107" strokeWidth={2} />
                                        <Line type="monotone" dataKey="memory" stroke="#0dcaf0" strokeWidth={2} />
                                        <Line type="monotone" dataKey="disk" stroke="#dc3545" strokeWidth={2} />
                                        <Line type="monotone" dataKey="network" stroke="#198754" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-6 mb-3 mb-md-4">
                    <div className="card border-secondary h-100">
                        <div className="card-body">
                            <h6 className="card-title mb-2 mb-md-3">Current Usage (Bar Chart)</h6>
                            <div style={{ width: "100%", height: "clamp(220px, 40vw, 320px)" }}>
                                <ResponsiveContainer>
                                    <BarChart data={barChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: 12 }} />
                                        <Bar dataKey="value" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;