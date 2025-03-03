import Homepage_Navbar from '@/components/home/homepage_navbar';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type RelationshipType =
    | "Aunt" | "Boyfriend" | "Brother" | "Brother-in-law" | "Colleague" | "Cousin"
    | "Child" | "Daughter" | "Daughter-in-law" | "Father" | "Father-in-law"
    | "Friend" | "Fiancé" | "Girlfriend" | "Grandfather" | "Grandmother" | "Grandchild"
    | "Husband" | "Mother" | "Mother-in-law" | "Parent" | "Sibling" | "Spouse";

type planType = 'Basic' | 'Premium' | 'Family';

type FormValues = {
    firstName: string;
    middleName: string;
    lastName: string;
    plans: planType;
    gender: 'male' | 'female';
    relationship: RelationshipType;
    designation: string;
    birthDate?: string;
    deathDate?: string;
    location?: string;
};


const PLANS: planType[] = ['Basic', 'Premium', 'Family'];

const relationships: RelationshipType[] = [
    "Aunt", "Boyfriend", "Brother", "Brother-in-law", "Colleague", "Cousin",
    "Child", "Daughter", "Daughter-in-law", "Father", "Father-in-law", "Friend",
    "Fiancé", "Girlfriend", "Grandfather", "Grandmother", "Grandchild",
    "Husband", "Mother", "Mother-in-law", "Parent", "Sibling", "Spouse"
]

const MemorialForm = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const [selectedPlan, setSelectedPlan] = useState('');
    const [privacySetting, setPrivacySetting] = useState('public');

    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

    // Generate memorial URL
    // const firstName = watch('firstName') || 'lisa';
    // const lastName = watch('lastName') || 'luu';
    // // const memorialUrl = `https://${firstName.toLowerCase()}-${lastName.toLowerCase()}.forevermissed.com`;

    return (
        <>
            <Homepage_Navbar name="Guest" imageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAALVBMVEXQ0NCxsbG0tLTPz8/Hx8e3t7fAwMDMzMy9vb21tbW6urrBwcGurq7FxcXT09M4BFhyAAAE60lEQVR4nO2dW5OjIBCFVUSNEv7/z92YzQVjVIRmOKTO97IPUzXl2Ya+QNNTVYQQQgghhBBCCCGEEEIIIYQQQgghhBCSBDuT+yNSYfvrMF60voxD16rfk9kOTW3qN2Of+4tE6Qfjqrtj6jb3Z4nR6k91Lzv+wlq1alyZ781UvkQ17Oi7LVWd+wMjsdc9eXcuRXuc3QX6kqhyf2Ywtj+Wd6dUiXZ/BzroMiV6rdAHo6rK86l9461vptFDW5RK2/ob0DFlQW71GiJwjo6lJHJTmMBZYxF2tOECZ1r47RgpsDZDbgVHRAqcJUJb0U6R+tAl2i7WgneJ19w6toleog9QPWpYoP9Gk1vKBq2Qvts67XJr+YpvteQlEbLeEBRY14hG3DpRC+OSW84a74LXD8CIcR1FFdaAYd/2ohoBl2l1urLfBzPqWzl3A7gR7whKRIwXM3JhH7VOtIOUwjG3lC3EjAir0Er5U1iFlVRURN2HtyqYCj2ZcgvZREihwcxpZqRs+PMKgW/4j+/uvUBN2m50MgpxF6lQPARepDIKDfJNokjq3eCdYbyR2IfQJhSJFrhZ94xEtIA88X4TfXCKvUZvBWKsMzVXZDdTqU7HlsAdtMDqEn+4rzvgfKbqZW4vgDei0C0wcHEodc+Ne4QhpVDjehsZgcgKhc4SgRUGNl5+AlzhyxzqI+dtMtdrqB1DdyRKC9Tb0QcCCrGrp+jSoobsw1gQrxA3Z/tPdAsmcDB8ECsR3YTV/Gp0/SrWE2Ma4FjoEhj5p74AAz4IO8vADoQLwhoWkLO1FWFhsZw1GlgLN9DJzCchCnEPL74QVGSUtA2DDhbxk5klp30N8Bnid9RZheglxZqT7hSzs3uXk48tS1ujM6eq4bL86JMTHcNlCpyfXP64QO+4X54bfeIbMZBboPbx9qZFpdwu3p4GtyP4AO83e0VVFQt8K4zCwr1V7yklXvqeFxW2A75Wc5hHmL1vjzys+Jqi0Jcxiq+de2rMq+/neM6CeTXqzfmB0eCj+Npnz9BrZ9m22df4+s9QT8W4Gq1ycm0nxO3lbs1rIo2TAA2gGvtFcFhc5G5pbJx8zV3OZsDbj7b/DO+LVEy1w+diNbU7GMp+NDmgTY2yrV5vtuXxp1X9NOra/KcZh9ZdinY9VcM0Hc5i3XImX6c+9e06vm95XAhDWrVaf8528kypN0OKye51bHuQXXsY4Sie6GvGycqbI3TfXA4GlNneI+3JZEjV1T61gzHdzlrtv7iob78kw91wf2K8Za2nfj360Vbt5N82bS5/q/FgQvAXmrG7OVH74OZRp20PtaFR/+FEvoi3P3oc7xsvqJmh+aNCUuiNYQjmL847lJ9vSCUx/VReuaFlgaQ+ehR6UhFF0s0oNlcvhpRWPH3tmYSU4zFlp7IFk661SGR6pwTJOm9yC3uTKCxmjPSfJDJiblkuSdoYgUyYpnVDSY7UiyZFf1H2dG1JgkscsVFsMsh3wWEt0hTLFCHldpHPa4SGB8khvhGFh8zGMwpvRJtb0BpZgXDbsBYvhOG2obhCqUlzckg7UzhHI518i80lFUQ2XGAc0CyRVSj5lw+kkM1MIU4RP6DCc0DV9w+o8BSC4+TlED2q+X2FlW7wEL5JVM4/u7/53A9VxA9hWsIIIYQQQgghhBBCCCGEEEIIIYQQQgghOPwDhx9CCdDcDFsAAAAASUVORK5CYII="

            />
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-2xl mx-auto bg-primary-hover_light rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Create a Memorial Website
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Personal Details Section */}
                        <div className="space-y-4">
                            
                            <h2 className="text-xl font-semibold text-gray-600 mb-6 border-b pb-2">
                            About your loved one
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        First Name
                                    </label>
                                    <input
                                        {...register('firstName', { required: "First Name is required" })}
                                        type='text'
                                        placeholder='Enter your first name'
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-blue-500mt-1  focus:border-primary "
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Last Name
                                    </label>
                                    <input
                                        {...register('lastName', { required: "Last Name is required" })}
                                        type='text'
                                        placeholder="Enter your last name"
                                        className="mt-1  px-3 py-2 border   focus:outline-none  focus:border-blue-500mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                            </div>

                            {/* Gender Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">
                                    Gender
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            {...register('gender', { required: true })}
                                            value="male"
                                            className="h-4 w-4 text-primary focus:ring-primary"
                                        />
                                        <span className="ml-2 text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            {...register('gender', { required: true })}
                                            value="female"
                                            className="h-4 w-4 text-primary focus:ring-primary"
                                        />
                                        <span className="ml-2 text-gray-700">Female</span>
                                    </label>
                                </div>
                            </div>

                            {/* Relationship and Designation */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Relationship
                                    </label>
                                    <select
                                        {...register('relationship', { required: true })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-blue-500mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    >
                                        {relationships.map((relation) => (
                                            <option key={relation} value={relation}>
                                                {relation}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Designation
                                    </label>
                                    <input
                                        {...register('designation', { required: "true" })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-blue-500mt-1  focus:border-primary "
                                        placeholder="Victim of an accident"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Memorial URL Preview */}


                        {/* Optional Details */}
                        <div className="space-y-4">


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        {...register('birthDate')}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-blue-500mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">
                                        Date of Passing
                                    </label>
                                    <input
                                        type="date"
                                        {...register('deathDate')}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-blue-500mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-600 mb-6 border-b pb-2">
                                Choose Your Plan
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {PLANS.map((plan) => (
                                    <div
                                        key={plan}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all
                                        ${selectedPlan === plan ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-primary'}`}
                                    >
                                        <h3 className="text-lg font-semibold mb-2">{plan} Plan</h3>
                                        <p className="text-gray-600 text-sm">
                                            {plan === 'Basic' && 'Free forever with basic features'}
                                            {plan === 'Premium' && '$9.99/month - Advanced features'}
                                            {plan === 'Family' && '$14.99/month - Shared access'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                        {/* Privacy Settings */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-600 mb-6 border-b pb-2">
                                Privacy Options
                            </h2>

                            <div className="space-y-4">
                                {['public', 'private'].map((option) => (
                                    <label key={option} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            name="privacy"
                                            value={option}
                                            checked={privacySetting === option}
                                            onChange={(e) => setPrivacySetting(e.target.value)}
                                            className="form-radio h-5 w-5 text-blue-500"
                                        />
                                        <span className="capitalize">{option}</span>
                                        <span className="text-gray-500 text-sm">
                                            {option === 'public' && '(Visible to everyone)'}
                                            {option === 'private' && '(Only visible to you)'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </section>


                        <button
                            type="submit"
                            className="w-full bg-primary text-white hover:text-primary py-2 px-4 rounded-md hover:bg-primary-hover_light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default MemorialForm;