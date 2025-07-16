import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllStudents, fetchAllCoaches, deleteTeam } from '../api/endpointCalls';
import CustomSelect from './custom_select/customSelect';
import { Team } from '../types/team';
import { Student } from '../types/student';
import { Coach } from '../types/coach';
import { Option } from '../types/option';
import { TeamFormData } from '../types/teamFormData';

interface TeamFormProps {
    initialData?: TeamFormData;
    onSubmit: (team: Team) => Promise<Team>;
    onCancel: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
    submitLabel: string;
    deleteButton: boolean;
    onDelete: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

const emptyTeam = (): TeamFormData => ({
    team: {
        team_id: 0,
        team_number: '',
        school_year: '',
        ER_director: null,
        long_distance_access_code: null,
        caedm_group_folder: null,
        project: null,
        external_review_coach: [],
        logo: '',
        team_name: '',
        email_list: [],
        team_box_folder: null,
        class_document_folder: null,
        grading_coach_one: null,
        grading_coach_two: null
    },
    coach: [],
    students: [],
});

export default function TeamForm({ initialData = emptyTeam(), onSubmit, onCancel, submitLabel, deleteButton, onDelete}: TeamFormProps) {
    const [formData, setFormData] = useState<TeamFormData>(emptyTeam());
    //     {
    //     coach: [],
    //     students: [],
    //     team:
    //     {
    //         team_id: '',
    //         team_number: '',
    //         school_year: '',
    //         grading_coach_one: '',
    //         grading_coach_two: '',
    //         ER_director: '',
    //         long_distance_access_code: '',
    //         caedm_group_folder: '',
    //         project: '',
    //         external_review_coach: [],
    //         logo: '',
    //         pdf_logo: '',
    //         team_name: '',
    //         email_list: '',
    //         team_box_folder: '',
    //         class_document_folder: ''
    //     }
    // });
    // the following will be used eventually in file uploads
    const [logo, setLogo] = useState<File | null>(null);
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogo(e.target.files?.[0] ?? null);
    
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [allCoaches, setAllCoaches] = useState<Coach[]>([]);

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
    const studentOptions: Option[] = useMemo(() => allStudents.filter(s => s.team_id == null && !formData.students.some(fs => fs.user_id === s.user_id))
        .map(student => ({
            value: student.user_id,
            label: `${student.preferred_name ? student.preferred_name : student.first_name} ${student.last_name} (${student.net_id})`,
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
    const coachOptions: Option[] = useMemo(() => {
        // Guard clause: if coach contains only one undefined element, return all options
        if (
            !Array.isArray(formData.coach) ||
            (formData.coach.length === 1 && formData.coach[0] === undefined)
        ) {
            return allCoaches.map(indCoach => ({
                value: indCoach.user_id,
                label: `${indCoach.preferred_name ? indCoach.preferred_name : indCoach.first_name} ${indCoach.last_name} (${indCoach.net_id})`,
            }));
        }

        // Normal filtering logic
        return allCoaches
            .filter(s => !formData.coach.some(fs => fs.user_id === s.user_id))
            .map(indCoach => ({
                value: indCoach.user_id,
                label: `${indCoach.preferred_name ? indCoach.preferred_name : indCoach.first_name} ${indCoach.last_name} (${indCoach.net_id})`,
            }));
    }, [allCoaches, formData.coach]);

    //If we are editing (instead of creating) a team, initialize the data to what was already there
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(initialData);
        }
    }, []);


    //When the user clicks the submit button, handle accordingly (be it create or update)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //The following code is for eventual image/file upload handling
        // const fd = new FormData();
        // Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
        // console.log(fd.entries().team);
        // if (logo) fd.append('logo', logo);
        // console.log(fd);

        const parseNumOrNull = (num: string | null) => {
            if (!num) return null;
            const parsed = Number(num);
            return isNaN(parsed) ? null : parsed;
        };

        try {
            const cleanedTeam: Team = {
                ...formData,
                team: {
                    ...formData.team,
                    ER_director: parseNumOrNull(formData.team.ER_director),
                    long_distance_access_code: parseNumOrNull(formData.team.long_distance_access_code),
                    caedm_group_folder: parseNumOrNull(formData.team.caedm_group_folder),
                    project: parseNumOrNull(formData.team.project),
                    team_box_folder: parseNumOrNull(formData.team.team_box_folder),
                    class_document_folder: parseNumOrNull(formData.team.class_document_folder),
                }
            };
            const navTeam: Team = await onSubmit(cleanedTeam);
        } catch (err) {
            console.error(err);
        }
    };


    //When the user changes a field, change it here in the data
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData(prev => ({
            ...prev,
            team: {
                ...prev.team,
                [name]: value
            }
        }));
    };

    //If an option is clicked from the dropdown, remove it from the dropdown and add it to the data
    const handleAddStudent = useCallback((userId: string) => {
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
    const handleRemoveStudent = useCallback((userId: number) => {
        const student = formData.students.find(s => s.user_id === userId);
        if (!student) return;
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
    const handleAddCoach = useCallback((userId: string) => {
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
    const handleRemoveCoach = useCallback((userId: number) => {
        // TODO add a confirmation popup
        const coach = formData.coach.find(s => s.user_id === userId);
        if (!coach) return;
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
                        <label className="flex-1 w-full border border-gray-300 rounded p-2">
                            {item.first_name} {item.last_name} ({item.net_id})
                        </label>
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
                        handleAddCoach(selectedOption.value.toString());
                    }}
                    placeholder="Select a coach to add..." 
                />
            </div>
            <div>
                <label className="block font-medium">Students</label>
                {formData.students.map((item, index) => (
                    <div className='flex items-center mb-2'>
                        <label className="flex-1 w-full border border-gray-300 rounded p-2">
                            {item.first_name} {item.last_name} ({item.net_id})
                        </label>
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
                        handleAddStudent(selectedOption.value.toString());
                    }}
                    placeholder="Select a student to add..." 
                />
            </div>
            <label className="block font-medium">Grading Coach One</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="grading_coach_one" type="text" value={formData.team.grading_coach_one ? 
                formData.team.grading_coach_one.first_name + " " + formData.team.grading_coach_one.last_name : ""} onChange={handleChange} />
            <label className="block font-medium">Grading Coach Two</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="grading_coach_two" type="text" value={formData.team.grading_coach_two ? 
                formData.team.grading_coach_two.first_name + " " + formData.team.grading_coach_two.last_name : ""} onChange={handleChange} />
            <label className="block font-medium">ER Director</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="ER_director" type="text" value={formData.team.ER_director??0} onChange={handleChange} />
            <label className="block font-medium">Long Distance Access Code</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="long_distance_access_code" type="text" value={formData.team.long_distance_access_code??0} onChange={handleChange} />
            <label className="block font-medium">CAEDM Group Folder</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="caedm_group_folder" type="text" value={formData.team.caedm_group_folder??0} onChange={handleChange} />
            <label className="block font-medium">Project</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="project" type="text" value={formData.team.project??0} onChange={handleChange} />
            <label className="block font-medium">External Review Coach</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="external_review_coach" type="text" value={formData.team.external_review_coach! ? formData.team.external_review_coach.join(", ") : ""} onChange={handleChange} />
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
                name="team_box_folder" type="text" value={formData.team.team_box_folder??0} onChange={handleChange} />
            <button type="button"
                className="px-6 py-2 bg-byuRoyal text-white font-semibold rounded hover:bg-[#003a9a] mt-2">
                Build Team Box Folder
            </button>
            <label className="block font-medium">Class Document Folder</label>
            <input className="w-full border border-gray-300 rounded p-2" 
                name="class_document_folder" type="text" value={formData.team.class_document_folder??0} onChange={handleChange} />
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
                {deleteButton &&
                <button type="button" onClick={(e) => {
                                if (window.confirm("Are you sure you want to delete this team?")) {
                                    onDelete(e);       
                                }}}
                    className="ml-4 rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-slate-500">
                    Delete
                </button>}
            </div>
        </form>
    );
}