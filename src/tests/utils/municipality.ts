export async function createMunicipality(municipality : any, callAPI : any) {
    const response = await callAPI().post("/municipality").send(municipality);
    return JSON.parse(response.text);
}

export async function createOneMunicipality(callAPI : any) {
    return await createMunicipality(getOneMunicipality(), callAPI);
}

export async function createSecondMunicipality(callAPI : any) {
    return await createMunicipality(getSecondMunicipality(), callAPI);
}

export function getOneMunicipality() {
    return {
        name: "Québec",
        coordinates: {
            lat: 46.8565177,
            long: -71.4817748
        },
        website: "https://www.ville.quebec.qc.ca/"
    };
};

export function getSecondMunicipality() {
    return {
        name: "Québec",
        coordinates: {
            lat: 46.8565177,
            long: -71.4817748
        },
        website: "https://www.ville.quebec.qc.ca/"
    };
};