export function ProfileSkeleton() {
    const keys = ['name', 'email', 'address', 'phone'];
    return (
        <>
            {
                keys.map((key) => (
                    <p key={key}>{key} : loading...</p>
                ))
            }
        </>
    )
}

export function ParagraphSkeleton() {
    return (
        <p>fetching Data......</p>
    )
}