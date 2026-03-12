const PostItems = ({data}) => {

    const imageUrl = data.post_image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${data.post_image.id}` : null;
    console.log(data)
    const creationDate = new Date(data.date_created).toLocaleDateString('de-DE', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    return (<div className="mx-auto max-w-[900px] py-10 px-5 grid gap-4">
            <h1 className="text-3xl font-bold">{data.title}</h1>
            {imageUrl && (<img
                    src={imageUrl}
                    alt={data.post_image.description || data.post_image.title || data.title}
                    className="w-full h-auto rounded-lg"
                />)}
            {data.author && typeof data.author === 'object' && (
                <p className="author">by {data.author.first_name} {data.author.last_name}</p>
            )}
            <p>{creationDate}</p>
            <div dangerouslySetInnerHTML={{__html: data.content}}></div>

        </div>)
}

export default PostItems