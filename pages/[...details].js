import styles from '../styles/Details.module.css';
import Image from 'next/image';
import Head from 'next/head';

export default function Details({data}) {
    const filterImage = (sectionListDetailSingle) => {
      let single = [];
      let singleUrl = '';
      sectionListDetailSingle.filter((img) => {
        if (img.postertype === "LANDSCAPE") {
          single = img.filelist;
        }
      });
      if (single.length > 0) {  
          single.filter((img) => {
            if (img.quality === "HD") {
              singleUrl =  img.filename;
            }
          });
    } else singleUrl = '';
    return singleUrl;
  }
    return(
      <>
        <Head>
          <title>{data.defaulttitle}</title>
          <meta name="description" content={data.shortdescription} />
        </Head>
        <div className={styles.detailsContainer}>
            <div className={styles.detailMainSection}>
                <div className={styles.deatilsText}>
                    <h1 className='M0'>{data.defaulttitle}</h1>
                    <p>{data.shortdescription}</p>
                    <h5><span>{data.category}</span> | <span>{data.defaultgenre}</span> | <span>{data.contentlanguage}</span> | <span>{data.pgrating}</span></h5>
                </div>
                <div className={styles.deatilsImage}>
                    <Image
                        unoptimized
                        src={filterImage(data.poster)} 
                        alt={data.defaulttitle}
                        width={200}
                        height={300}
                    />
                </div>
            </div>
        </div>
      </>
    )
}

export async function getServerSideProps(context) {
     // Fetch data from external API 
    const section = context && context.query && context.query.details;
     context.res.setHeader(
       'Cache-Control',
       'public, s-maxage=100, stale-while-revalidate=59'
     );
     const URl = `https://vcms.mobiotics.com/prodv3/subscriber/v1/content/`+section[2]+`?displaylanguage=eng`;
     const response = await fetch(URl, {"headers":{
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VpZCI6IjEyMjM3NjQ2ODgwOTg4MDMiLCJkZXZpY2V0eXBlIjoiUEMiLCJkZXZpY2VvcyI6IldJTkRPV1MiLCJwcm92aWRlcmlkIjoibm9vcnBsYXkiLCJ0aW1lc3RhbXAiOjE2NzI2NDQ0NDYsImFwcHZlcnNpb24iOiI0Ni40LjAiLCJpcCI6IjE1LjE1OC40Mi40IiwiR2VvTG9jSXAiOiIxNzEuNzYuNzEuNzIiLCJ2aXNpdGluZ2NvdW50cnkiOiJJTiIsImlzc3VlciI6Im5vb3JwbGF5IiwiZXhwaXJlc0luIjo2MDQ4MDAsInByb3ZpZGVybmFtZSI6Ik5vb3JQbGF5IiwiaWF0IjoxNjcyNjQ0NDM0LCJleHAiOjE2NzMyNDkyMzQsImlzcyI6Im5vb3JwbGF5In0.cgt9LtwAVmeJI5tTiNBPSLV1G1VQ7t-iq_oc4fyAw0o'
     }});
     const content = await response.json();
     let data = [];
     data = content ? content : [];
     // Pass data to the page via props
     return { props: { data } }
}