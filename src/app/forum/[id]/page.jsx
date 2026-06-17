

const ForumDetailsPage = async ({ params }) => {
    const { id } = await params;

    return (
        <div className="section-container py-20">
            <h1 className="heading-font text-5xl">
                Forum Post
            </h1>

            <p className="mt-4 text-gray-400">
                Post ID: {id}
            </p>
        </div>
    );
};

export default ForumDetailsPage;