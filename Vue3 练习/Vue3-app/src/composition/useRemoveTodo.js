export default function useRemoveTodo ( todoRef ) {
    const remove = ( todo ) => {
        todoRef.value.splice ( todoRef.value.indexOf ( todo ),
                                1 );
    };
    const removeCompleted = () => {
        todoRef.value = todoRef.value.filter ( ( it ) => !it.completed );
    };
    
    return {
        remove,
        removeCompleted
    };
}