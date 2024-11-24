import React, { useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import Layout from '../components/Layout';

export default function PaymentProcess() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {
            label: 'Información Personal'
        },
        {
            label: 'Reserva'
        },
        {
            label: 'Revisión'
        }
    ];

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <div>Formulario de Información Personal</div>;
            case 1:
                return <div>Formulario de Reserva</div>;
            case 2:
                return <div>Revisión y Confirmación</div>;
            default:
                return <div>Formulario de Información Personal</div>;
        }
    };

    return (
        <Layout>
            <div className="card">
                <h1 className="text-3xl font-bold text-center mt-10">Proceso de Pago</h1>
                <div className="flex flex-wrap justify-content-end gap-2 mb-3">
                    <Button outlined={activeIndex !== 0} rounded label="1" onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" />
                    <Button outlined={activeIndex !== 1} rounded label="2" onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" />
                    <Button outlined={activeIndex !== 2} rounded label="3" onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0" />
                </div>
                <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} />
                <div className="mt-5">
                    {renderStepContent(activeIndex)}
                </div>
                <div className="flex justify-content-between mt-5">
                    <Button label="Anterior" icon="pi pi-chevron-left" onClick={() => setActiveIndex(prev => Math.max(prev - 1, 0))} disabled={activeIndex === 0} />
                    <Button label="Siguiente" icon="pi pi-chevron-right" onClick={() => setActiveIndex(prev => Math.min(prev + 1, items.length - 1))} disabled={activeIndex === items.length - 1} />
                </div>
            </div>
            <ControlledDemo />
        </Layout>
    );
}

function ControlledDemo() {
    const [activeIndex, setActiveIndex] = useState(0);
    const items = [
        {
            label: 'Personal Info'
        },
        {
            label: 'Reservation'
        },
        {
            label: 'Review'
        }
    ];

    return (
        <div className="card">
            <div className="flex flex-wrap justify-content-end gap-2 mb-3">
                <Button outlined={activeIndex !== 0} rounded label="1" onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" />
                <Button outlined={activeIndex !== 1} rounded label="2" onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" />
                <Button outlined={activeIndex !== 2} rounded label="3" onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0" />
            </div>
            <Steps model={items} activeIndex={activeIndex} />
        </div>
    );
}