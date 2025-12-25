"use server"

export async function caregiverApplicationData(info) {
    const newCareGiver = {...info};
    newCareGiver.verified = false;
    newCareGiver.createdAt = new Date().toISOString();
    newCareGiver.updatedAt = new Date().toDateString();
    console.log(newCareGiver);
}