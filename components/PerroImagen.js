import React from 'react';
import { Image } from 'primereact/image';

const HeroImage = () => {
    return (
        <div className="perro-imagen" style={{ position: 'relative', textAlign: 'center', color: 'black' }}>
            <Image src="/images/imagenHome.png" alt="Hero Dog" style={{ width: '100%', height: 'auto' }} />
            <div className="hero-text" style={{ position: 'absolute', top: '30%', left: '65%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>VETERINARIA WONDER PET</h1>
                <h2 style={{ fontSize: '2rem' }}> SALUD Y BIENESTAR ANIMAL</h2>
                <p style={{ fontSize: '1.5rem' }}>El mejor cuidado que ellos se merecen</p>
            </div>
        </div>
    );
};

export default HeroImage;
