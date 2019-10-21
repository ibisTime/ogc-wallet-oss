import fetch from './fetch';

async function getBasisData() {
    const data = await fetch(660918, {
        type: 'h5_pic'
    });
    return data;
}

export default getBasisData();