// Memorial.tsx
import  { useMemorial }  from '@/context/memorial/MemorialContext';
import  Middle_Navbar from '@/components/Memorial/MiddleNavbar/MiddleNavbar';
import ProfileHeader from '@/components/Memorial/Header/profile_header';
import Memorial_Navbar from '@/components/Memorial/Header/memorial_navbar';
import Tribute from '@/components/Memorial/Sections/About Tributes/Tribute';
import Life from '@/components/Memorial/Sections/Life/Life';
import Gallery from '@/components/Memorial/Sections/Gallery/Gallery';
import Story from '@/components/Memorial/Sections/Stories/Story';
import MemorialProgram from '@/components/Memorial/Sections/Program/MemorialProgram';
import Hymns from '@/components/Memorial/Sections/Hymns/Hymns';
import { useEffect  } from 'react';
import { useParams } from "react-router-dom";
import { NotFoundPage } from './NotFound';



const Memorial: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Get slug from URL


    

  const { 
    activeButton, 
    currentMemorial, 
    isLoading,
    showFullHeader,
    loadMemorial
  } = useMemorial();

  
  useEffect(() => {
    if (slug) {
        loadMemorial(slug);
    }
}, [slug, loadMemorial]);
  
if (isLoading) return <p className="text-center text-lg text-gray-600">Loading memorial...</p>;

if (!currentMemorial) return (
  // <p className="text-center text-lg text-red-500">
  //   Memorial not found. Please check the URL or try again later.
  // </p>
  <NotFoundPage/>
);


  const renderPageContent = () => {
    switch(activeButton) {
      case "TRIBUTES": return <Tribute />;
      case "LIFE": return <Life />;
      case "GALLERY": return <Gallery />;
      case "STORIES": return <Story />;
      case "PROGRAM": return <MemorialProgram />;
      case "HYMNS": return <Hymns />;
      default: return <Tribute />;
    }
  };
  
  return (
    <>
      <Memorial_Navbar 
        name='Guest'
        imageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXQ0NCxsbG0tLTPz8/Hx8e3t7fAwMDMzMy9vb21tbW6urrBwcGurq7FxcXT09M4BFhyAAAE60lEQVR4nO2dW5OjIBCFVUSNEv7/z92YzQVjVIRmOKTO97IPUzXl2Ya+QNNTVYQQQgghhBBCCCGEEEIIIYQQQgghhBCSBDuT+yNSYfvrMF60voxD16rfk9kOTW3qN2Of+4tE6Qfjqrtj6jb3Z4nR6k91Lzv+wlq1alyZ781UvkQ17Oi7LVWd+wMjsdc9eXcuRXuc3QX6kqhyf2Ywtj+Wd6dUiXZ/BzroMiV6rdAHo6rK86l9461vptFDW5RK2/ob0DFlQW71GiJwjo6lJHJTmMBZYxF2tOECZ1r47RgpsDZDbgVHRAqcJUJb0U6R+tAl2i7WgneJ19w6toleog9QPWpYoP9Gk1vKBq2Qvts67XJr+YpvteQlEbLeEBRY14hG3DpRC+OSW84a74LXD8CIcR1FFdaAYd/2ohoBl2l1urLfBzPqWzl3A7gR7whKRIwXM3JhH7VOtIOUwjG3lC3EjAir0Er5U1iFlVRURN2HtyqYCj2ZcgvZREihwcxpZqRs+PMKgW/4j+/uvUBN2m50MgpxF6lQPARepDIKDfJNokjq3eCdYbyR2IfQJhSJFrhZ94xEtIA88X4TfXCKvUZvBWKsMzVXZDdTqU7HlsAdtMDqEn+4rzvgfKbqZW4vgDei0C0wcHEodc+Ne4QhpVDjehsZgcgKhc4SgRUGNl5+AlzhyxzqI+dtMtdrqB1DdyRKC9Tb0QcCCrGrp+jSoobsw1gQrxA3Z/tPdAsmcDB8ECsR3YTV/Gp0/SrWE2Ma4FjoEhj5p74AAz4IO8vADoQLwhoWkLO1FWFhsZw1GlgLN9DJzCchCnEPL74QVGSUtA2DDhbxk5klp30N8Bnid9RZheglxZqT7hSzs3uXk48tS1ujM6eq4bL86JMTHcNlCpyfXP64QO+4X54bfeIbMZBboPbx9qZFpdwu3p4GtyP4AO83e0VVFQt8K4zCwr1V7yklXvqeFxW2A75Wc5hHmL1vjzys+Jqi0Jcxiq+de2rMq+/neM6CeTXqzfmB0eCj+Npnz9BrZ9m22df4+s9QT8W4Gq1ycm0nxO3lbs1rIo2TAA2gGvtFcFhc5G5pbJx8zV3OZsDbj7b/DO+LVEy1w+diNbU7GMp+NDmgTY2yrV5vtuXxp1X9NOra/KcZh9ZdinY9VcM0Hc5i3XImX6c+9e06vm95XAhDWrVaf8528kypN0OKye51bHuQXXsY4Sie6GvGycqbI3TfXA4GlNneI+3JZEjV1T61gzHdzlrtv7iob78kw91wf2K8Za2nfj360Vbt5N82bS5/q/FgQvAXmrG7OVH74OZRp20PtaFR/+FEvoi3P3oc7xsvqJmh+aNCUuiNYQjmL847lJ9vSCUx/VReuaFlgaQ+ehR6UhFF0s0oNlcvhpRWPH3tmYSU4zFlp7IFk661SGR6pwTJOm9yC3uTKCxmjPSfJDJiblkuSdoYgUyYpnVDSY7UiyZFf1H2dG1JgkscsVFsMsh3wWEt0hTLFCHldpHPa4SGB8khvhGFh8zGMwpvRJtb0BpZgXDbsBYvhOG2obhCqUlzckg7UzhHI518i80lFUQ2XGAc0CyRVSj5lw+kkM1MIU4RP6DCc0DV9w+o8BSC4+TlED2q+X2FlW7wEL5JVM4/u7/53A9VxA9hWsIIIYQQQgghhBBCCCGEEEIIIYQQQgghOPwDhx9CCdDcDFsAAAAASUVORK5CYII="
      />

      {showFullHeader && (
        <ProfileHeader />
      )}

      <div className="">
        <Middle_Navbar />
      </div>

      <div className="container mx-auto px-6 py-12 flex">
        {renderPageContent()}
        {/* <SecondColumn /> */}
      </div>
    </>
  );
};


export default Memorial




