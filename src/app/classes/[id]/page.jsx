


const ClassDetailsPage = async ({ params }) => {
    const { id } = await params;

    return (
        <div className="section-container py-20">
            <h1 className="heading-font text-5xl">
                Class Details
            </h1>

            <p className="mt-4 text-gray-400">
                Class ID: {id}
            </p>
        </div>
    );
};

export default ClassDetailsPage;