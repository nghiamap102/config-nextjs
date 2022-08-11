import { useQuery, gql } from '@apollo/client'

export default function Countries() {
    const { data, loading, error } = useQuery(
        gql`
            query Countries {
                countries {
                    code
                    name
                    emoji
                    __typename
                }
            }
        `,
    )
    if (loading) {
        return <h2>Loading...</h2>
    }
    if (error) {
        return null
    }
    const countries = data.countries.slice(0, 4)
    return (
        <div className="">
            {countries.map((country: any) => (
                <div key={country.code}>
                    <h3>{country.name}</h3>
                    <p>
                        {country.code} - {country.emoji}
                    </p>
                </div>
            ))}
        </div>
    )
}
