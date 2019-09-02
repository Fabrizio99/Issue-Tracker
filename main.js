addEventListener('load',()=>fetchIsuues())

document.getElementById('issue-input').addEventListener('submit',()=>{
    if(document.getElementById('issueDescription').value==="" || document.getElementById('issueAssigned').value===""){
        alert('Llene todo el formulario.')
        return;
    }
    saveIssue()
})

function saveIssue(){
    const issueDescription = document.getElementById('issueDescription').value
    const issueSeverity = document.getElementById('issueSeverity').value
    const issueAssigned = document.getElementById('issueAssigned').value
    const issueID = chance.guid()
    const issueStatus = 'Open'

    const issue = {
        id : issueID,
        description : issueDescription,
        severity : issueSeverity,
        assignedTo : issueAssigned,
        status : issueStatus
    }

    const issues = (localStorage.getItem('issues'))? JSON.parse(localStorage.getItem('issues')) : []
    issues.push(issue)
    localStorage.setItem('issues',JSON.stringify(issues))

    document.getElementById('issue-input').reset()
    fetchIsuues()
}

function fetchIsuues(){
    const issuesData = JSON.parse(localStorage.getItem('issues'))
    const issuesListContainer = document.getElementById('issuesList')

    if(issuesListContainer) issuesListContainer.textContent = ''
    const issuesList = document.createDocumentFragment()

    if(issuesData){
        issuesData.forEach(item => {
            let [id,desc,severity,assignedTo,status] = [item.id,item.description,item.severity,item.assignedTo,item.status]

            const issue = document.getElementById('structure').content.cloneNode(true)
            issue.querySelector('h6').textContent = `Issue ID: ${id}`
            issue.getElementById('status').textContent = status
            issue.querySelector('h3').textContent = desc
            issue.getElementById('issueSeverity').innerHTML +=`${severity}`
            issue.getElementById('issueAssignedTo').innerHTML +=`${assignedTo}`
            issue.getElementById('closeButton').addEventListener('click',()=>setStatusClosed(id))
            issue.getElementById('deleteButton').addEventListener('click',()=>deleteIssue(id))
            issuesList.prepend(issue)
        });
    }
    
    issuesListContainer.appendChild(issuesList)
}

function setStatusClosed(id){
    const issues = JSON.parse(localStorage.getItem('issues'))
    for (let index = 0; index < issues.length; index++) {
        if(issues[index].id!=id)    continue
        issues[index].status = 'Closed'
        break
    }
    localStorage.setItem('issues',JSON.stringify(issues))
    fetchIsuues()
}

function deleteIssue(id){
    const issues = JSON.parse(localStorage.getItem('issues'))
    for (let index = 0; index < issues.length; index++) {
        if(issues[index].id!=id)    continue
        issues.splice(index,1)
        break
    }
    localStorage.setItem('issues',JSON.stringify(issues))
    fetchIsuues()
}