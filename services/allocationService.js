// frontend/services/allocationService.js

export async function runAllocation(payload) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allocate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      throw new Error("Échec de la simulation d'allocation");
    }
  
    return res.json();
  }
  