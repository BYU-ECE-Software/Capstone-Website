import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllStudents, fetchAllCoaches } from '../api/endpointCalls';
import CustomSelect from './custom_select/customSelect';

export default function TeamForm({ initialData = {}, onSubmit, cancelRedirect, submitLabel}) {
    const [formData, setFormData] = useState({
        coach: [],
        students: [],
        team:
        {
            team_id: '',
            team_number: '',
            school_year: '',
            grading_coach_one: '',
            grading_coach_two: '',
            ER_director: '',
            long_distance_access_code: '',
            caedm_group_folder: '',
            project: '',
            external_review_coach: [],
            logo: '',
            pdf_logo: '',
            team_name: '',
            email_list: '',
            team_box_folder: '',
            class_document_folder: ''
        }
    });
    // the following will be used eventually in file uploads
    const [logo, setLogo] = useState(null);
    const handleLogoChange = (e) => setLogo(e.target.files?.[0] ?? null);
    
    const [allStudents, setAllStudents] = useState([]);
    const [allCoaches, setAllCoaches] = useState([]);

    //TODO have the dropdowns sort alphabetically (by netid, username?)
    //Get a list of all the students who aren't currently assigned to teams
    useEffect(() => {
        fetchAllStudents()
        .then((data) => {
            setAllStudents(data);
        })
        .catch((err) => console.error(err));
    }, []);
    //Set the options for the student dropdown to any unassigned student who hasn't been added yet to this team
    const studentOptions = useMemo(() => allStudents.filter(s => s.team_id == null && !formData.students.some(fs => fs.user_id === s.user_id))
        .map(student => ({
            value: student.user_id,
            label: `${student.prefered_name ? student.prefered_name : student.first_name} ${student.last_name} (${student.net_id})`,
        })),
        [allStudents, formData.students]
    );
    //Get a list of all the students who aren't currently assigned to teams
    useEffect(() => {
        fetchAllCoaches()
        .then((data) => {
            setAllCoaches(data);
        })
        .catch((err) => console.error(err));
    }, []);
    //Set the options for the student dropdown to any unassigned student who hasn't been added yet to this team
    // const coachOptions = useMemo(() => allCoaches.filter(s => !formData.coach.some(fs => fs.user_id === s.user_id))
    //     .map(indCoach => ({
    //         value: indCoach.user_id,
    //         label: `${indCoach.prefered_name ? indCoach.prefered_name : indCoach.first_name} ${indCoach.last_name} (${indCoach.net_id})`,
    //     })),
    //     [allCoaches, formData.coach]
    // );
    const coachOptions = useMemo(() => {
        // Guard clause: if coach contains only one undefined element, return all options
        if (
            !Array.isArray(formData.coach) ||
            (formData.coach.length === 1 && formData.coach[0] === undefined)
        ) {
            return allCoaches.map(indCoach => ({
                value: indCoach.user_id,
                label: `${indCoach.prefered_name ? indCoach.prefered_name : indCoach.first_name} ${indCoach.last_name} (${indCoach.net_id})`,
            }));
        }

        // Normal filtering logic
        return allCoaches
            .filter(s => !formData.coach.some(fs => fs.user_id === s.user_id))
            .map(indCoach => ({
                value: indCoach.user_id,
                label: `${indCoach.prefered_name ? indCoach.prefered_name : indCoach.first_name} ${indCoach.last_name} (${indCoach.net_id})`,
            }));
    }, [allCoaches, formData.coach]);

    //If we are editing (instead of creating) a team, initialize the data to what was already there
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(prev => {
            const updated = {
                coach: initialData.coach ? [initialData.coach] : [],
                students: initialData.students || [],
                team: {
                ...prev.team,
                },
            };

            // Copy only keys that belong in `team`
            for (const key in initialData) {
                if (key in updated.team) {
                updated.team[key] = initialData[key];
                }
            }

            return updated;
            });
        }
    }, [initialData]);


    //When the user clicks the submit button, handle accordingly (be it create or update)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        //The following code is for eventual image/file upload handling
        // const fd = new FormData();
        // Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
        // console.log(fd.entries().team);
        // if (logo) fd.append('logo', logo);
        // console.log(fd);
        try {
            const navTeam = await onSubmit(formData);
            navigate(`/teams/${navTeam.team.team_id}`);
        } catch (err) {
            console.error(err);
        }
    };
    const onCancel = async (e) => {
        e.preventDefault();
        try {
            navigate(cancelRedirect);
        } catch (err) {
            console.log(err);
        }
    };

    //When the user changes a field, change it here in the data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            team: {
                ...prev.team,
                [name]: value
            }
        }));
    };

    //If an option is clicked from the dropdown, remove it from the dropdown and add it to the data
    const handleAddStudent = useCallback((userId) => {
        const selected = allStudents.find(s => s.user_id === parseInt(userId));
        if (selected) {
            setFormData(prev => ({
                ...prev,
                students: [...prev.students, selected],
            }));
            setAllStudents(prev => prev.filter(s => s.user_id !== selected.user_id));
        }
    }, [allStudents, setAllStudents, setFormData]);

    //If a student is removed from a team, remove them from the team and add them to the dropdown
    const handleRemoveStudent = useCallback((userId) => {
        const student = formData.students.find(s => s.user_id === userId);
        setAllStudents(prev => {
            if (prev.some(s => s.user_id === userId)) return prev;
            return [...prev, student];
        });
        setFormData(prev => ({
            ...prev,
            students: prev.students.filter(s => s.user_id !== userId),
        }));
    }, [setAllStudents, formData, setFormData]);

        //If an option is clicked from the dropdown, remove it from the dropdown and add it to the data
    const handleAddCoach = useCallback((userId) => {
        const selected = allCoaches.find(s => s.user_id === parseInt(userId));
        if (selected) {
            setFormData(prev => ({
                ...prev,
                coach: [...prev.coach, selected],
            }));
            setAllCoaches(prev => prev.filter(s => s.user_id !== selected.user_id));
        }
    }, [allCoaches, setAllCoaches, setFormData]);

    //If a coach is removed from a team, remove them from the team and add them to the dropdown
    const handleRemoveCoach = useCallback((userId) => {
        // TODO add a confirmation popup
        const coach = formData.coach.find(s => s.user_id === userId);
        setAllCoaches(prev => {
            if (prev.some(s => s.user_id === userId)) return prev;
            return [...prev, coach];
        });
        setFormData(prev => ({
            ...prev,
            coach: prev.coach.filter(s => s.user_id !== userId),
        }));
    }, [setAllCoaches, formData, setFormData]);

    //The jsx layout of this component
    return (
        <form onSubmit={handleSubmit}>
            <label className="block font-medium">Team Number</label> {/* Hmmmmm. I've had this just an autogenerated key. Talk to office */}
            <input className="w-full border border-gray-300 rounded p-2" 
                name="team_number" type="text" value={formData.team.team_number} onChange={handleChange} />
            <label className="block font-medium">School Year</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="school_year" type="text" value={formData.team.school_year} onChange={handleChange} />
            <div>
                <label className="block font-medium">Coach</label>
                {(formData.coach.length > 0 && formData.coach[0] != undefined) &&
                    formData.coach.map((item, index) => (
                    <div className='flex items-center mb-2'>
                        <label className="flex-1 w-full border border-gray-300 rounded p-2" 
                        name="students">{item.first_name} {item.last_name} ({item.net_id})</label>
                        <button type="button"
                            className="ml-2 shrink-0 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to remove this coach?")) {
                                    handleRemoveCoach(item.user_id)
                                }
                            }} tabIndex={-1}>
                                Remove
                        </button>
                    </div>
                    ))
                
                }
                <label htmlFor='add-student'>Add Coach</label>
                <CustomSelect
                    options={coachOptions}
                    onSelect={(selectedOption) => {
                        handleAddCoach(selectedOption.value);
                    }}
                    placeholder="Select a coach to add..." 
                />
            </div>
            <div>
                <label className="block font-medium">Students</label>
                {formData.students.map((item, index) => (
                    <div className='flex items-center mb-2'>
                        <label className="flex-1 w-full border border-gray-300 rounded p-2" 
                        name="students">{item.first_name} {item.last_name} ({item.net_id})</label>
                        <button type="button" 
                            className="ml-2 shrink-0 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to remove this student?")) {
                                    handleRemoveStudent(item.user_id)        
                                }
                            }} tabIndex={-1}>
                                Remove
                        </button>
                    </div>
                ))
                }
                <label htmlFor='add-student'>Add Student</label>
                <CustomSelect
                    options={studentOptions}
                    onSelect={(selectedOption) => {
                        handleAddStudent(selectedOption.value);
                    }}
                    placeholder="Select a student to add..." 
                />
            </div>
            <label className="block font-medium">Grading Coach One</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="grading_coach_one" type="text" value={formData.team.grading_coach_one} onChange={handleChange} />
            <label className="block font-medium">Grading Coach Two</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="grading_coach_two" type="text" value={formData.team.grading_coach_two} onChange={handleChange} />
            <label className="block font-medium">ER Director</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="ER_director" type="text" value={formData.team.ER_director} onChange={handleChange} />
            <label className="block font-medium">Long Distance Access Code</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="long_distance_access_code" type="text" value={formData.team.long_distance_access_code} onChange={handleChange} />
            <label className="block font-medium">CAEDM Group Folder</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="caedm_group_folder" type="text" value={formData.team.caedm_group_folder} onChange={handleChange} />
            <label className="block font-medium">Project</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="project" type="text" value={formData.team.project} onChange={handleChange} />
            <label className="block font-medium">External Review Coach</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="external_review_coach" type="text" value={formData.team.external_review_coach} onChange={handleChange} />
            <label className="block font-medium">Logo</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="logo" type="file" onChange={handleLogoChange} accept='.png,.jpg,.jpeg'/> {/*value={formData.team.logo}*/}
            <label className="block font-medium">PDF Logo</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="pdf_logo" type="file" onChange={handleChange} /> {/*value={formData.team.pdf_logo}*/}
            <label className="block font-medium">Team Name</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="team_name" type="text" value={formData.team.team_name} onChange={handleChange} />
            <label className="block font-medium">Email List</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="email_list" type="text" value={formData.team.email_list} onChange={handleChange} />
            <label className="block font-medium">Team Box Folder</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="team_box_folder" type="text" value={formData.team.team_box_folder} onChange={handleChange} />
            <button type="button"
                className="px-6 py-2 bg-byuRoyal text-white font-semibold rounded hover:bg-[#003a9a] mt-2">
                Build Team Box Folder
            </button>
            <label className="block font-medium">Class Document Folder</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="class_document_folder" type="text" value={formData.team.class_document_folder} onChange={handleChange} />
            <button type="button"
                className="px-6 py-2 bg-byuRoyal text-white font-semibold rounded hover:bg-[#003a9a] mt-2">
                Build Class Document Folder
            </button>
            <div className='flex justify-center'>
                <button type="submit"
                    className="px-6 py-2 bg-byuRoyal text-white font-semibold rounded hover:bg-[#003a9a]">
                    {submitLabel}
                </button>
                <button type="button" onClick={onCancel}
                    className="px-6 py-2 bg-byuMediumGray text-white font-semibold rounded hover:bg-[#202224] ml-4">
                    Cancel
                </button>
                {/* future feature TODO delete button for Edit */}
            </div>
        </form>
    );
}